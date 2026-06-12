import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getProductById } from "@/data/products";
import { getMockPurchase } from "@/lib/dev/mock-purchases";

const isDev = process.env.NODE_ENV !== "production";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const product = getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  if (product.priceCFA === 0) {
    return NextResponse.json({ url: product.fileUrl });
  }

  // MODE MOCK : vérifier l'achat dans le mock
  if (isDev) {
    const purchase = getMockPurchase("mock-user-001", productId);
    if (!purchase || (purchase.paymentStatus !== "MOCK_PAID" && purchase.paymentStatus !== "PAID")) {
      return NextResponse.json({ error: "Achat requis" }, { status: 403 });
    }
    return NextResponse.json({ url: product.fileUrl });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const purchase = await prisma.purchase.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });
    if (!purchase || (purchase.paymentStatus !== "MOCK_PAID" && purchase.paymentStatus !== "PAID")) {
      return NextResponse.json({ error: "Achat requis" }, { status: 403 });
    }
    return NextResponse.json({ url: product.fileUrl });
  } catch (e) {
    console.error("[/api/products/[id]/download GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
