import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { MOCK_MENTORS } from "@/lib/dev/mock-community";

const isDev = process.env.NODE_ENV !== "production";

// GET — liste des mentors APPROVED
export async function GET() {
  try {
    const mentors = await prisma.mentor.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(mentors);
  } catch {
    if (isDev) return NextResponse.json(MOCK_MENTORS);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const mentorSchema = z.object({
  name: z.string().min(2).max(80),
  title: z.string().min(2).max(120),
  expertise: z.array(z.string()).min(1).max(8),
  bio: z.string().min(20).max(600),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  contactMethod: z.enum(["WHATSAPP", "EMAIL", "CALENDLY"]),
  contactValue: z.string().min(3).max(200),
  availability: z.string().min(2).max(120),
  city: z.enum(["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO", "OTHER"]),
});

// POST — soumettre une candidature mentor (status PENDING)
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = mentorSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const data = {
    ...parsed.data,
    avatarUrl: parsed.data.avatarUrl || null,
    userId: user?.id ?? null,
    status: "PENDING" as const,
  };

  try {
    const mentor = await prisma.mentor.create({ data });
    return NextResponse.json(mentor, { status: 201 });
  } catch (err) {
    console.error("[/api/community/mentors POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
