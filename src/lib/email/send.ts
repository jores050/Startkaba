import { resend, FROM_EMAIL } from "./resend-client";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export interface SendEmailResult {
  ok: boolean;
  mocked: boolean;
  error?: string;
}

// Point d'envoi centralisé. Si RESEND_API_KEY est absente, bascule en mode mock
// (log console au lieu d'un envoi réel) — pratique en dev et pour le soft launch.
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<SendEmailResult> {
  if (!resend) {
    const preview = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
    console.info(`[email:mock] → ${to}\n  sujet : ${subject}\n  aperçu: ${preview}`);
    return { ok: true, mocked: true };
  }

  try {
    const { error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, mocked: false, error: String(error) };
    }
    return { ok: true, mocked: false };
  } catch (e) {
    console.error("[email] échec d'envoi:", e);
    return { ok: false, mocked: false, error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}
