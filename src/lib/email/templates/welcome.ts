// Template email de bienvenue — HTML inline (email-safe), couleurs StartKaba.

export function welcomeEmail(firstName: string, appUrl: string): { subject: string; html: string } {
  const dashboardUrl = `${appUrl.replace(/\/$/, "")}/dashboard`;
  return {
    subject: `Bienvenue sur StartKaba, ${firstName} 🚀`,
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
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0A0E2A;">Bienvenue, ${firstName} 👋</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4A5280;">
            Ton compte est prêt. À partir de maintenant, tu avances de l'idée au lancement,
            niveau par niveau, avec Kaba à tes côtés — un coach qui connaît ton projet et
            les réalités de l'Afrique de l'Ouest.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4A5280;">
            Le premier pas&nbsp;? Ouvre ton parcours et lance le Niveau 1.
          </p>
          <a href="${dashboardUrl}" style="display:inline-block;background:#F77E2D;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:12px;">
            Ouvrir mon tableau de bord
          </a>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #E8EAF0;">
          <p style="margin:0;font-size:13px;color:#8892C8;">À très vite,<br/>L'équipe StartKaba</p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#8892C8;">© 2026 StartKaba</p>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
