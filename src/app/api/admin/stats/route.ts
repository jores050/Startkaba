import { NextResponse } from "next/server";
import { mockAdminStats } from "@/lib/dev/mock-admin";

// GET — métriques plateforme (mocké en local).
export async function GET() {
  return NextResponse.json(mockAdminStats);
}
