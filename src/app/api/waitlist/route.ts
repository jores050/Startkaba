import { NextResponse } from "next/server";
import { z } from "zod";

// Liste d'attente matching co-fondateurs — mock en mémoire (Phase 2).
const globalForMock = globalThis as unknown as {
  mockWaitlist?: { fullName: string; email: string; city: string; skills: string; createdAt: string }[];
};
const waitlist = globalForMock.mockWaitlist ?? [];
globalForMock.mockWaitlist = waitlist;

const waitlistSchema = z.object({
  fullName: z.string().min(2, "Nom trop court").max(100),
  email: z.string().email("Adresse email invalide"),
  city: z.enum(["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO", "OTHER"]),
  skills: z.string().max(200).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  if (waitlist.some((w) => w.email === parsed.data.email)) {
    return NextResponse.json({ error: "Cet email est déjà sur la liste d'attente." }, { status: 409 });
  }

  waitlist.push({
    ...parsed.data,
    skills: parsed.data.skills ?? "",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, position: waitlist.length });
}
