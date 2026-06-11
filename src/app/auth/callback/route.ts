import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/auth/ensure-profile";

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
      try {
        await ensureProfile({
          userId: data.user.id,
          email: data.user.email ?? "",
          fullName:
            (data.user.user_metadata.full_name as string) ??
            (data.user.user_metadata.name as string) ??
            "Entrepreneur",
          avatarUrl: data.user.user_metadata.avatar_url as string | undefined,
        });
      } catch {
        // Base injoignable — profil créé plus tard via /api/user/profile.
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
