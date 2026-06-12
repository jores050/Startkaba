import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const isDev = process.env.NODE_ENV !== "production";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDev) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (isDev) {
    return NextResponse.json({
      products: [],
      stats: { totalSales: 0, totalRevenue: 0, pendingPayout: 0 },
    });
  }

  return NextResponse.json({
    products: [],
    stats: { totalSales: 0, totalRevenue: 0, pendingPayout: 0 },
  });
}
