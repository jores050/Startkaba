import { NextResponse } from "next/server";
import { mockNotifications } from "@/lib/dev/mock-notifications";

// PUT — tout marquer comme lu.
export async function PUT() {
  for (const n of mockNotifications) n.read = true;
  return NextResponse.json({ ok: true });
}
