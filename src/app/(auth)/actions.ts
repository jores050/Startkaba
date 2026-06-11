"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/auth/ensure-profile";
import { loginSchema, signupSchema } from "@/lib/validations/auth";

export interface AuthState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    city: formData.get("city"),
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
      await ensureProfile({ userId: data.user.id, email, fullName, city });
    } catch {
      // La base n'est pas joignable (env fictif) — le profil sera créé
      // au premier appel authentifié via /api/user/profile.
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

function traduireErreur(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "Email ou mot de passe incorrect.",
    "Email not confirmed": "Confirme ton email avant de te connecter.",
    "User already registered": "Un compte existe déjà avec cet email.",
  };
  return map[message] ?? `Erreur d'authentification : ${message}`;
}
