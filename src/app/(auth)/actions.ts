"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/auth/ensure-profile";
import { loginSchema, signupSchema } from "@/lib/validations/auth";
import { sendEmail } from "@/lib/email/send";
import { welcomeEmail } from "@/lib/email/templates/welcome";

export interface AuthState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    city: formData.get("city"),
    acceptedTerms: formData.get("acceptedTerms") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { fieldErrors };
  }

  const { fullName, email, password, city } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, city },
    },
  });

  if (error) {
    return { error: traduireErreur(error.message) };
  }

  if (data.user) {
    try {
      await ensureProfile({ userId: data.user.id, email, fullName, city, acceptedTermsAt: new Date() });
    } catch {
      // La base n'est pas joignable (env fictif) — le profil sera créé
      // au premier appel authentifié via /api/user/profile.
    }
    // Email de bienvenue (non bloquant — mock si pas de clé Resend).
    try {
      const firstName = fullName.split(" ")[0] || fullName;
      const { subject, html } = welcomeEmail(firstName, APP_URL);
      await sendEmail({ to: email, subject, html });
    } catch {
      // L'échec d'email ne doit jamais bloquer l'inscription.
    }
  }

  redirect("/dashboard");
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: traduireErreur(error.message) };
  }

  redirect("/dashboard");
}

export async function signInWithGoogle(): Promise<AuthState> {
  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    return { error: traduireErreur(error.message) };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: "Impossible de démarrer la connexion Google." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

const resetEmailSchema = z.object({ email: z.string().email("Adresse email invalide") });

// Envoie le lien de réinitialisation. Passe par /auth/callback pour établir la
// session de récupération (cookies) avant d'atteindre /auth/reset-password.
export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = resetEmailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { fieldErrors: { email: parsed.error.issues[0]?.message ?? "Email invalide" } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${APP_URL}/auth/callback?next=/auth/reset-password`,
  });

  // Anti-énumération : on confirme l'envoi sans révéler si l'email existe.
  if (error && !/rate|limit/i.test(error.message)) {
    return { success: true };
  }
  if (error) {
    return { error: traduireErreur(error.message) };
  }
  return { success: true };
}

const newPasswordSchema = z.object({
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// Met à jour le mot de passe — la session de récupération est posée par /auth/callback.
export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = newPasswordSchema.safeParse({ password: formData.get("password") });
  if (!parsed.success) {
    return { fieldErrors: { password: parsed.error.issues[0]?.message ?? "Mot de passe invalide" } };
  }
  if (formData.get("confirm") !== parsed.data.password) {
    return { fieldErrors: { confirm: "Les mots de passe ne correspondent pas." } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    return { error: traduireErreur(error.message) };
  }

  redirect("/login?reset=success");
}

function traduireErreur(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "Email ou mot de passe incorrect.",
    "Email not confirmed": "Confirme ton email avant de te connecter.",
    "User already registered": "Un compte existe déjà avec cet email.",
  };
  return map[message] ?? `Erreur d'authentification : ${message}`;
}
