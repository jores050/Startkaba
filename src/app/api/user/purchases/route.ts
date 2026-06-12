import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getProductById } from "@/data/products";
import { getMockUserPurchases } from "@/lib/dev/mock-purchases";

const isDev = process.env.NODE_ENV !== "production";

export async function GET() {
  // MODE MOCK : toujours utiliser les données mockées en dev
  if (isDev) {
    const entries = getMockUserPurchases("mock-user-001");
    const result = entries.map((p) => ({
      ...p,
      product: getProductById(p.productId) ?? null,
    }));
    return NextResponse.json({ purchases: result });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    const result = purchases.map((p) => ({
      ...p,
      product: getProductById(p.productId) ?? null,
    }));
    return NextResponse.json({ purchases: result });
  } catch (e) {
    console.error("[/api/user/purchases GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
