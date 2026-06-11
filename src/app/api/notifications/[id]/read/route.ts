import { NextResponse } from "next/server";
import { mockNotifications } from "@/lib/dev/mock-notifications";

// PUT — marquer une notification comme lue.
export async function PUT(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const notif = mockNotifications.find((n) => n.id === params.id);
  if (!notif) {
    return NextResponse.json({ error: "Notification introuvable" }, { status: 404 });
  }
  notif.read = true;
  return NextResponse.json(notif);
}
