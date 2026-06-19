import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Bypass d'auth pour le dev local sans Supabase réel (.env.local).
// Ne JAMAIS activer en production.
const devBypassAuth =
  process.env.NODE_ENV !== "production" &&
  process.env.DEV_BYPASS_AUTH === "true";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (devBypassAuth) {
    return supabaseResponse;
  }

  // Si les variables Supabase sont absentes (mauvaise config Vercel), on laisse passer
  // pour éviter MIDDLEWARE_INVOCATION_FAILED et afficher une page d'erreur lisible.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  let user = null;
  let supabase: ReturnType<typeof createServerClient> | null = null;
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase injoignable → laisse passer, les pages géreront l'état non authentifié
    return supabaseResponse;
  }

  const { pathname } = request.nextUrl;

  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/parcours") ||
    pathname.startsWith("/coach") ||
    pathname.startsWith("/badges") ||
    pathname.startsWith("/classement") ||
    pathname.startsWith("/communaute") ||
    pathname.startsWith("/ressources") ||
    pathname.startsWith("/profil") ||
    pathname.startsWith("/onboarding");

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Pas de session → redirection vers /login
  if ((isAppRoute || isAdminRoute) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Déjà connecté → pas besoin des pages d'auth
  if (isAuthPage && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // Guard admin : vérifie isAdmin dans user_profiles (via PostgREST,
  // Prisma n'étant pas disponible en Edge runtime).
  if (isAdminRoute && user && supabase) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("isAdmin")
      .eq("id", user.id)
      .single();

    if (!profile?.isAdmin) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
