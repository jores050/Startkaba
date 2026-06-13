import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function isAdmin(userId: string) {
  const profile = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });
  return profile?.isAdmin ?? false;
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !(await isAdmin(user.id))) {
    return NextResponse.json({ error: "Interdit" }, { status: 403 });
  }
  const mentors = await prisma.mentor.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(mentors);
}
