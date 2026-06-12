import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { PRODUCTS } from "@/data/products";
import { getMockUserPurchases } from "@/lib/dev/mock-purchases";

const isDev = process.env.NODE_ENV !== "production";

export async function GET() {
  // MODE MOCK : toujours utiliser les données mockées en dev (tables pas encore migrées)
  if (isDev) {
    const purchasedProductIds = new Set(
      getMockUserPurchases("mock-user-001")
        .filter((p) => p.paymentStatus === "MOCK_PAID" || p.paymentStatus === "PAID")
        .map((p) => p.productId)
    );
    const products = PRODUCTS.filter((p) => p.status === "PUBLISHED").map((p) => ({
      ...p,
      isPurchased: purchasedProductIds.has(p.id),
    }));
    return NextResponse.json({ products });
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
      where: {
        userId: user.id,
        paymentStatus: { in: ["PAID", "MOCK_PAID"] },
      },
      select: { productId: true },
    });
    const purchasedProductIds = new Set(purchases.map((p) => p.productId));
    const products = PRODUCTS.filter((p) => p.status === "PUBLISHED").map((p) => ({
      ...p,
      isPurchased: purchasedProductIds.has(p.id),
    }));
    return NextResponse.json({ products });
  } catch (e) {
    console.error("[/api/products GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
