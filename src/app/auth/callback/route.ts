import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { ensureProfile } from "@/lib/auth/ensure-profile";
import { sendEmail } from "@/lib/email/send";
import { welcomeEmail } from "@/lib/email/templates/welcome";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// Retour OAuth (Google) : échange le code contre une session,
// crée le profil si premier login, puis redirige vers le dashboard.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const fullName =
        (data.user.user_metadata.full_name as string) ??
        (data.user.user_metadata.name as string) ??
        "Entrepreneur";
      try {
        // Détecte un premier login (profil inexistant) pour l'email de bienvenue.
        const existing = await prisma.userProfile
          .findUnique({ where: { id: data.user.id }, select: { id: true } })
          .catch(() => null);

        await ensureProfile({
          userId: data.user.id,
          email: data.user.email ?? "",
          fullName,
          avatarUrl: data.user.user_metadata.avatar_url as string | undefined,
        });

        if (!existing && data.user.email) {
          const { subject, html } = welcomeEmail(fullName.split(" ")[0] || fullName, APP_URL);
          await sendEmail({ to: data.user.email, subject, html });
        }
      } catch {
        // Base injoignable — profil créé plus tard via /api/user/profile.
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
