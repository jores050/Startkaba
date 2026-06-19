// Template email de réinitialisation de mot de passe — HTML inline, couleurs StartKaba.
// Note : l'email de reset est normalement envoyé par Supabase (configurable dans son
// dashboard). Ce template sert de référence / d'usage si on bascule sur un envoi maison.

export function passwordResetEmail(resetUrl: string): { subject: string; html: string } {
  return {
    subject: "Réinitialise ton mot de passe StartKaba",
    html: `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#F5F6FA;font-family:Helvetica,Arial,sans-serif;color:#0A0E2A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6FA;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E8EAF0;">
        <tr><td style="background:#0722AB;padding:28px 32px;">
          <span style="font-size:20px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">StartKaba</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0A0E2A;">Réinitialise ton mot de passe</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4A5280;">
            Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous
            pour en choisir un nouveau. Ce lien expire dans 1 heure.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#F77E2D;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:12px;">
            Choisir un nouveau mot de passe
          </a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8892C8;">
            Si tu n'es pas à l'origine de cette demande, ignore simplement cet email — ton mot
            de passe reste inchangé.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #E8EAF0;">
          <p style="margin:0;font-size:13px;color:#8892C8;">L'équipe StartKaba</p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#8892C8;">© 2026 StartKaba</p>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
