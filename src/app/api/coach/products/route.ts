import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const isDev = process.env.NODE_ENV !== "production";

const createSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  priceCFA: z.number().min(0),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDev) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (isDev) {
    console.log("[coach/products] Mock product created:", parsed.data);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
