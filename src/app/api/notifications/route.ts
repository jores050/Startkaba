import { NextResponse } from "next/server";
import { mockNotifications } from "@/lib/dev/mock-notifications";

// GET — les 10 dernières notifications (mocké en local).
export async function GET() {
  const sorted = [...mockNotifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted.slice(0, 10));
}
