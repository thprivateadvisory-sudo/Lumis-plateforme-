import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend } from '@/lib/resend'

export const dynamic = 'force-dynamic'

interface ContactRequest {
  firstName?: string
  lastName?: string
  email: string
  company?: string
  subject: string
  message: string
}

function buildNotificationEmail(data: ContactRequest): string {
  const { firstName, lastName, email, company, subject, message } = data
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Non renseigné'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Nouveau message de contact — LUMIS.AI</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;background:#d4ff00;border-radius:12px;padding:12px 28px;">
                <span style="font-size:24px;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px;">LUMIS.AI</span>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#141414;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
              <div style="height:4px;background:linear-gradient(90deg,#d4ff00,#a8cc00);"></div>
              <div style="padding:40px;">
                <h2 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#ffffff;">
                  📬 Nouveau message de contact
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;margin-bottom:24px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 20px;border-bottom:1px solid #2a2a2a;">
                      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#666666;">Détails de l'expéditeur</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:120px;">Nom</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:500;">${fullName}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:120px;">Email</td>
                          <td style="font-size:14px;color:#d4ff00;font-weight:500;">
                            <a href="mailto:${email}" style="color:#d4ff00;text-decoration:none;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ${
                    company
                      ? `<tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:120px;">Entreprise</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:500;">${company}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding:14px 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:120px;">Sujet</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:600;">${subject}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 20px;border-bottom:1px solid #2a2a2a;">
                      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#666666;">Message</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px;font-size:15px;color:#cccccc;line-height:1.7;white-space:pre-wrap;">${message}</td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:13px;color:#444444;">
                © ${new Date().getFullYear()} LUMIS.AI — L'IA française souveraine
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildConfirmationEmail(data: ContactRequest): string {
  const { firstName, email } = data
  const displayName = firstName ? firstName : 'là'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lumis.ai'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Votre message a bien été reçu — LUMIS.AI</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;background:#d4ff00;border-radius:12px;padding:12px 28px;">
                <span style="font-size:24px;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px;">LUMIS.AI</span>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#141414;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
              <div style="height:4px;background:linear-gradient(90deg,#d4ff00,#a8cc00);"></div>
              <div style="padding:48px 40px;text-align:center;">

                <!-- Icon -->
                <div style="font-size:48px;margin-bottom:20px;">✅</div>

                <!-- Title -->
                <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">
                  Message bien reçu !
                </h1>
                <p style="margin:0 0 32px;font-size:16px;color:#888888;line-height:1.6;">
                  Bonjour ${displayName},<br />
                  nous avons bien reçu votre message et vous répondrons<br />
                  <strong style="color:#d4ff00;">dans les 4 heures ouvrées</strong>.
                </p>

                <!-- Promise box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;margin-bottom:32px;overflow:hidden;">
                  <tr>
                    <td style="padding:24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:48px;vertical-align:middle;">
                            <div style="width:40px;height:40px;background:#d4ff0022;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">⏱</div>
                          </td>
                          <td style="padding-left:16px;vertical-align:middle;">
                            <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">Réponse sous 4h garantie</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#666666;">En jours ouvrés, du lundi au vendredi</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="${siteUrl}"
                         style="display:inline-block;background:#d4ff00;color:#0a0a0a;font-size:15px;font-weight:800;text-decoration:none;padding:14px 40px;border-radius:50px;letter-spacing:0.3px;">
                        Retourner sur LUMIS.AI →
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <div style="height:1px;background:#2a2a2a;margin:36px 0;"></div>

                <p style="margin:0;font-size:14px;color:#555555;line-height:1.6;">
                  Vous pouvez également nous joindre directement à<br />
                  <a href="mailto:contact@lumis.ai" style="color:#d4ff00;text-decoration:none;">contact@lumis.ai</a>
                </p>

              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:13px;color:#444444;">
                © ${new Date().getFullYear()} LUMIS.AI — L'IA française souveraine<br />
                <a href="${siteUrl}/legal/privacy" style="color:#555555;text-decoration:none;">Politique de confidentialité</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}/legal/terms" style="color:#555555;text-decoration:none;">CGU</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactRequest = await request.json()
    const { firstName, lastName, email, company, subject, message } = body

    // Validate required fields
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'A valid email address is required' },
        { status: 400 }
      )
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'subject is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'message is required' },
        { status: 400 }
      )
    }

    const sanitised: ContactRequest = {
      firstName: firstName?.trim() || undefined,
      lastName: lastName?.trim() || undefined,
      email: email.trim().toLowerCase(),
      company: company?.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
    }

    // Persist lead to Supabase
    const { error: dbError } = await getSupabaseAdmin().from('leads').insert({
      first_name: sanitised.firstName ?? null,
      last_name: sanitised.lastName ?? null,
      email: sanitised.email,
      company: sanitised.company ?? null,
      subject: sanitised.subject,
      message: sanitised.message,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error('[contact/route] Supabase insert error:', dbError)
      // Continue — still send emails
    }

    const emailPromises: Promise<unknown>[] = []

    // Internal notification email to LUMIS team
    emailPromises.push(
      getResend().emails.send({
        from: 'LUMIS.AI Contact <noreply@lumis.ai>',
        to: 'contact@lumis.ai',
        replyTo: sanitised.email,
        subject: `[Contact] ${sanitised.subject}`,
        html: buildNotificationEmail(sanitised),
      })
    )

    // Confirmation email to the user
    emailPromises.push(
      getResend().emails.send({
        from: 'LUMIS.AI <noreply@lumis.ai>',
        to: sanitised.email,
        subject: 'Votre message a bien été reçu ✅',
        html: buildConfirmationEmail(sanitised),
      })
    )

    const results = await Promise.allSettled(emailPromises)

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`[contact/route] Email ${index} send failed:`, result.reason)
      } else if (result.status === 'fulfilled') {
        const value = result.value as { error?: unknown }
        if (value?.error) {
          console.error(`[contact/route] Email ${index} Resend error:`, value.error)
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact/route] Unexpected error:', error)
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
