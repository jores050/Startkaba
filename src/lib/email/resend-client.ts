import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// null si pas de clé → le helper sendEmail bascule en mode mock (log console).
export const resend = apiKey ? new Resend(apiKey) : null;

// Sans domaine custom : utiliser l'adresse sandbox Resend (onboarding@resend.dev),
// qui n'autorise l'envoi qu'à l'email du propriétaire du compte Resend.
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "StartKaba <onboarding@resend.dev>";
