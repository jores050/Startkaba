import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function isAdmin(userId: string) {
  const profile = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });
  return profile?.isAdmin ?? false;
}

const schema = z.object({ status: z.enum(["APPROVED", "REJECTED"]) });

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !(await isAdmin(user.id))) {
    return NextResponse.json({ error: "Interdit" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "status requis" }, { status: 400 });
  }

  const mentor = await prisma.mentor.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });
  return NextResponse.json(mentor);
}
