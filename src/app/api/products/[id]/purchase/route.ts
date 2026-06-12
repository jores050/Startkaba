import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getProductById } from "@/data/products";
import { createMockPurchase, getMockPurchase } from "@/lib/dev/mock-purchases";

const isDev = process.env.NODE_ENV !== "production";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const product = getProductById(productId);
  if (!product || product.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const commissionCFA =
    product.ownerType === "STARTKABA"
      ? product.priceCFA
      : Math.round(product.priceCFA * 0.2);
  const coachAmountCFA = product.priceCFA - commissionCFA;

  // MODE MOCK : toujours simuler en dev
  if (isDev) {
    const existing = getMockPurchase("mock-user-001", productId);
    if (existing && (existing.paymentStatus === "MOCK_PAID" || existing.paymentStatus === "PAID")) {
      return NextResponse.json({ ok: true, alreadyPurchased: true });
    }
    createMockPurchase({
      id: `mock-purchase-${Date.now()}`,
      userId: "mock-user-001",
      productId,
      priceCFA: product.priceCFA,
      commissionCFA,
      coachAmountCFA,
      paymentStatus: "MOCK_PAID",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    await prisma.purchase.upsert({
      where: { userId_productId: { userId: user.id, productId } },
      update: { paymentStatus: "MOCK_PAID", paidAt: new Date() },
      create: {
        userId: user.id,
        productId,
        priceCFA: product.priceCFA,
        commissionCFA,
        coachAmountCFA,
        paymentStatus: "MOCK_PAID",
        paidAt: new Date(),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/products/[id]/purchase POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
