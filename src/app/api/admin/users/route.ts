import { NextResponse } from "next/server";
import { z } from "zod";
import { mockAdminUsers } from "@/lib/dev/mock-admin";

// GET /api/admin/users?q= — liste des utilisateurs (recherche nom/email).
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.toLowerCase() ?? "";
  const users = q
    ? mockAdminUsers.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    : mockAdminUsers;
  return NextResponse.json({ users });
}

const actionSchema = z.object({
  userId: z.string(),
  action: z.enum(["toggle-disabled", "toggle-admin", "reset-progress"]),
});

// PUT — actions admin sur un utilisateur.
export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Format invalide" }, { status: 400 });
  }

  const user = mockAdminUsers.find((u) => u.id === parsed.data.userId);
  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  switch (parsed.data.action) {
    case "toggle-disabled":
      user.disabled = !user.disabled;
      break;
    case "toggle-admin":
      user.isAdmin = !user.isAdmin;
      break;
    case "reset-progress":
      user.totalXp = 0;
      user.currentLevelId = 1;
      break;
  }

  return NextResponse.json(user);
}
