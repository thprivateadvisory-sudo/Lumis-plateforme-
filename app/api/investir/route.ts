import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend } from '@/lib/resend'

export const dynamic = 'force-dynamic'

interface InvestRequest {
  pack: string
  packAmount: string
  packYield: string
  firstName: string
  lastName?: string
  email: string
  phone?: string
  company?: string
  message?: string
}

function buildNotificationEmail(data: InvestRequest): string {
  const { pack, packAmount, packYield, firstName, lastName, email, phone, company, message } = data
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Non renseigné'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Nouvelle demande d'investissement — Cohesif IA</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;background:#0BC8F0;border-radius:12px;padding:12px 28px;">
                <span style="font-size:24px;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px;">Cohesif IA</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#141414;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
              <div style="height:4px;background:linear-gradient(90deg,#0BC8F0,#a8cc00);"></div>
              <div style="padding:40px;">
                <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff;">
                  💰 Nouvelle demande d'investissement
                </h2>
                <div style="display:inline-block;background:rgba(11,200,240,0.12);border:1px solid rgba(11,200,240,0.25);border-radius:8px;padding:6px 14px;margin-bottom:24px;">
                  <span style="font-size:14px;font-weight:700;color:#0BC8F0;">Pack ${pack} — ${packAmount} · ${packYield}/an</span>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;margin-bottom:24px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 20px;border-bottom:1px solid #2a2a2a;">
                      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#666666;">Coordonnées de l'investisseur</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:140px;">Nom</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:500;">${fullName}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:140px;">Email</td>
                          <td style="font-size:14px;color:#0BC8F0;font-weight:500;">
                            <a href="mailto:${email}" style="color:#0BC8F0;text-decoration:none;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:140px;">Téléphone</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:500;">${phone}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>` : ''}
                  ${company ? `<tr>
                    <td style="padding:14px 20px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:140px;">Entreprise</td>
                          <td style="font-size:14px;color:#ffffff;font-weight:500;">${company}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>` : ''}
                  ${message ? `<tr>
                    <td style="padding:14px 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:14px;color:#888888;width:140px;vertical-align:top;">Message</td>
                          <td style="font-size:14px;color:#cccccc;line-height:1.6;white-space:pre-wrap;">${message}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>` : ''}
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:13px;color:#444444;">© 2026 Groupe Cohesif — L'IA française souveraine</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildConfirmationEmail(data: InvestRequest): string {
  const { pack, packAmount, packYield, firstName } = data
  const displayName = firstName || 'là'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cohesif-ia.fr'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Votre demande d'investissement — Cohesif IA</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;background:#0BC8F0;border-radius:12px;padding:12px 28px;">
                <span style="font-size:24px;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px;">Cohesif IA</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#141414;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
              <div style="height:4px;background:linear-gradient(90deg,#0BC8F0,#a8cc00);"></div>
              <div style="padding:48px 40px;text-align:center;">
                <div style="font-size:48px;margin-bottom:20px;">🎯</div>
                <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">
                  Demande reçue !
                </h1>
                <p style="margin:0 0 28px;font-size:16px;color:#888888;line-height:1.6;">
                  Bonjour ${displayName},<br />
                  votre intérêt pour le <strong style="color:#0BC8F0;">Pack ${pack}</strong> a bien été enregistré.<br />
                  Notre équipe investisseurs vous contactera sous <strong style="color:#0BC8F0;">24h ouvrées</strong>.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;margin-bottom:32px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:13px;color:#666666;padding-bottom:4px;">Pack sélectionné</td>
                        </tr>
                        <tr>
                          <td style="font-size:20px;font-weight:800;color:#0BC8F0;">${pack}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:16px 24px;border-right:1px solid #2a2a2a;text-align:center;width:50%;">
                            <div style="font-size:12px;color:#666666;margin-bottom:4px;">Investissement min.</div>
                            <div style="font-size:18px;font-weight:700;color:#ffffff;">${packAmount}</div>
                          </td>
                          <td style="padding:16px 24px;text-align:center;width:50%;">
                            <div style="font-size:12px;color:#666666;margin-bottom:4px;">Rendement cible</div>
                            <div style="font-size:18px;font-weight:700;color:#a8cc00;">${packYield}/an</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                  <tr>
                    <td align="center">
                      <a href="${siteUrl}/investir"
                         style="display:inline-block;background:#0BC8F0;color:#0a0a0a;font-size:15px;font-weight:800;text-decoration:none;padding:14px 40px;border-radius:50px;letter-spacing:0.3px;">
                        Retourner sur la page investisseurs →
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="height:1px;background:#2a2a2a;margin:0 0 28px;"></div>
                <p style="margin:0;font-size:12px;color:#444444;line-height:1.7;">
                  Investir comporte des risques, notamment de perte en capital.<br />
                  Les rendements indiqués sont des projections et ne constituent pas une garantie.<br />
                  <a href="${siteUrl}/legal/privacy" style="color:#555555;text-decoration:none;">Politique de confidentialité</a>
                  &nbsp;·&nbsp;
                  <a href="${siteUrl}/legal/terms" style="color:#555555;text-decoration:none;">CGU</a>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:13px;color:#444444;">© 2026 Groupe Cohesif — L'IA française souveraine</p>
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
    const body: InvestRequest = await request.json()
    const { pack, packAmount, packYield, firstName, lastName, email, phone, company, message } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'A valid email address is required' },
        { status: 400 }
      )
    }

    if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'firstName is required' },
        { status: 400 }
      )
    }

    if (!pack || !packAmount) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'pack and packAmount are required' },
        { status: 400 }
      )
    }

    const sanitised: InvestRequest = {
      pack: pack.trim(),
      packAmount: packAmount.trim(),
      packYield: packYield?.trim() ?? '',
      firstName: firstName.trim(),
      lastName: lastName?.trim() || undefined,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message?.trim() || undefined,
    }

    try {
      const { error: dbError } = await getSupabaseAdmin().from('leads').insert({
        first_name: sanitised.firstName,
        last_name: sanitised.lastName ?? null,
        email: sanitised.email,
        company: sanitised.company ?? null,
        subject: `Investissement — Pack ${sanitised.pack} (${sanitised.packAmount})`,
        message: [
          sanitised.phone ? `Tél : ${sanitised.phone}` : null,
          sanitised.message ? `Message : ${sanitised.message}` : null,
          `Pack : ${sanitised.pack} | Montant min. : ${sanitised.packAmount} | Rendement : ${sanitised.packYield}/an`,
        ].filter(Boolean).join('\n'),
        created_at: new Date().toISOString(),
      })
      if (dbError) {
        console.error('[investir/route] Supabase insert error:', dbError)
      }
    } catch (dbErr) {
      console.error('[investir/route] Supabase unavailable:', dbErr)
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const notifTo = process.env.CONTACT_NOTIFICATION_EMAIL ?? 'thprivateadvisory@gmail.com'
        const results = await Promise.allSettled([
          getResend().emails.send({
            from: 'Cohesif IA <onboarding@resend.dev>',
            to: notifTo,
            replyTo: sanitised.email,
            subject: `[Investissement] Pack ${sanitised.pack} — ${sanitised.firstName} ${sanitised.lastName ?? ''}`.trim(),
            html: buildNotificationEmail(sanitised),
          }),
          getResend().emails.send({
            from: 'Cohesif IA <onboarding@resend.dev>',
            to: sanitised.email,
            subject: `Votre demande d'investissement Pack ${sanitised.pack} — Cohesif IA`,
            html: buildConfirmationEmail(sanitised),
          }),
        ])
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`[investir/route] Email ${index} send failed:`, result.reason)
          }
        })
      } catch (emailErr) {
        console.error('[investir/route] Email service error:', emailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[investir/route] Unexpected error:', error)
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
