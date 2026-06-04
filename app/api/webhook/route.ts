import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend } from '@/lib/resend'
import type Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

function getPlanLabel(plan: string): string {
  const labels: Record<string, string> = {
    pro: 'LUMIS Pro',
    business: 'LUMIS Business',
  }
  return labels[plan] ?? plan
}

function getBillingLabel(billing: string): string {
  const labels: Record<string, string> = {
    monthly: 'Mensuel',
    annual: 'Annuel',
  }
  return labels[billing] ?? billing
}

function buildWelcomeEmail(customerEmail: string, plan: string, billing: string): string {
  const planLabel = getPlanLabel(plan)
  const billingLabel = getBillingLabel(billing)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lumis.ai'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue dans LUMIS.AI</title>
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

              <!-- Top accent bar -->
              <div style="height:4px;background:linear-gradient(90deg,#d4ff00,#a8cc00);"></div>

              <div style="padding:48px 40px;">

                <!-- Title -->
                <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
                  Bienvenue dans LUMIS.AI&nbsp;🚀
                </h1>
                <p style="margin:0 0 32px;font-size:16px;color:#888888;">
                  Votre abonnement est activé. Prêt à booster votre productivité&nbsp;?
                </p>

                <!-- Plan details -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border-radius:12px;margin-bottom:32px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#666666;">Votre plan</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:15px;color:#aaaaaa;">Formule</td>
                          <td align="right">
                            <span style="display:inline-block;background:#d4ff00;color:#0a0a0a;font-size:13px;font-weight:700;padding:4px 12px;border-radius:20px;">${planLabel}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:15px;color:#aaaaaa;">Facturation</td>
                          <td align="right" style="font-size:15px;color:#ffffff;font-weight:600;">${billingLabel}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="${siteUrl}/dashboard"
                         style="display:inline-block;background:#d4ff00;color:#0a0a0a;font-size:16px;font-weight:800;text-decoration:none;padding:16px 48px;border-radius:50px;letter-spacing:0.3px;">
                        Accéder à la plateforme →
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <div style="height:1px;background:#2a2a2a;margin:40px 0;"></div>

                <!-- Support note -->
                <p style="margin:0;font-size:14px;color:#666666;text-align:center;line-height:1.6;">
                  Une question&nbsp;? Notre équipe répond en moins de 4h.<br />
                  <a href="mailto:contact@lumis.ai" style="color:#d4ff00;text-decoration:none;">contact@lumis.ai</a>
                </p>

              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
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
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[webhook/route] Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('[webhook/route] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const customerEmail =
          session.customer_details?.email ?? (session.customer_email as string | null)

        const plan = (session.metadata?.plan ?? 'pro') as string
        const billing = (session.metadata?.billing ?? 'monthly') as string
        const stripeCustomerId =
          typeof session.customer === 'string' ? session.customer : null

        // Persist subscription to Supabase
        const { error: dbError } = await getSupabaseAdmin().from('subscriptions').insert({
          customer_email: customerEmail,
          plan,
          billing,
          stripe_customer_id: stripeCustomerId,
          status: 'active',
          created_at: new Date().toISOString(),
        })

        if (dbError) {
          console.error('[webhook/route] Supabase insert error:', dbError)
          // Continue — still send the welcome email
        }

        // Send welcome email
        if (customerEmail) {
          const { error: emailError } = await getResend().emails.send({
            from: 'LUMIS.AI <noreply@lumis.ai>',
            to: customerEmail,
            subject: 'Bienvenue dans LUMIS.AI ! 🚀',
            html: buildWelcomeEmail(customerEmail, plan, billing),
          })

          if (emailError) {
            console.error('[webhook/route] Resend welcome email error:', emailError)
          }
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const stripeCustomerId =
          typeof subscription.customer === 'string' ? subscription.customer : null

        if (stripeCustomerId) {
          const { error: dbError } = await getSupabaseAdmin()
            .from('subscriptions')
            .update({ status: 'cancelled', updated_at: new Date().toISOString() })
            .eq('stripe_customer_id', stripeCustomerId)

          if (dbError) {
            console.error('[webhook/route] Supabase update error:', dbError)
          }
        }

        break
      }

      default:
        // Unhandled event type — acknowledge without processing
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[webhook/route] Handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
