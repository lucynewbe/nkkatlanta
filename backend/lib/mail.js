async function sendMail({ subject, text, html }) {
  const to = process.env.ADMIN_NOTIFY_EMAIL || process.env.CONTACT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!to) {
    console.log('[mail skipped — no ADMIN_NOTIFY_EMAIL]', subject);
    return;
  }
  if (!resendKey) {
    console.log('[mail skipped — no RESEND_API_KEY]', { to, subject, text });
    return;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || 'NKK Atlanta <noreply@atlantakannada.org>',
        to: [to],
        subject,
        text,
        html: html || `<pre>${text}</pre>`,
      }),
    });
    if (!res.ok) console.error('[mail failed]', await res.text());
  } catch (err) {
    console.error('[mail error]', err.message);
  }
}

module.exports = { sendMail };
