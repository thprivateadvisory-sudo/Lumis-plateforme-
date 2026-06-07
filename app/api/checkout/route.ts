import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

type Plan = 'pro' | 'business'
type Billing = 'monthly' | 'annual'

interface CheckoutRequest {
  plan: Plan
  billing: Billing
  userEmail?: string
}

type PriceMap = Record<Plan, Record<Billing, string | undefined>>

function getPriceId(plan: Plan, billing: Billing): string | undefined {
  const priceMap: PriceMap = {
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
      annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
    },
    business: {
      monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY,
      annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL,
    },
  }

  return priceMap[plan]?.[billing]
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CheckoutRequest = await request.json()
    const { plan, billing, userEmail } = body

    // Validate input
    if (!plan || !billing) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'plan and billing are required' },
        { status: 400 }
      )
    }

    const validPlans: Plan[] = ['pro', 'business']
    const validBillings: Billing[] = ['monthly', 'annual']

    if (!validPlans.includes(plan)) {
      return NextResponse.json(
        { error: 'INVALID_PLAN', message: `plan must be one of: ${validPlans.join(', ')}` },
        { status: 400 }
      )
    }

    if (!validBillings.includes(billing)) {
      return NextResponse.json(
        {
          error: 'INVALID_BILLING',
          message: `billing must be one of: ${validBillings.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const priceId = getPriceId(plan, billing)

    if (!priceId) {
      console.error(`[checkout/route] Missing price ID for plan=${plan} billing=${billing}`)
      return NextResponse.json(
        { error: 'PRICE_NOT_CONFIGURED', message: 'This plan is not available at the moment' },
        { status: 500 }
      )
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cohesif-ia.fr'

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // 14 jours gratuits sans carte bancaire requise
      payment_method_collection: 'if_required',
      subscription_data: {
        trial_period_days: 14,
        trial_settings: {
          end_behavior: {
            missing_payment_method: 'cancel',
          },
        },
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/tarifs`,
      allow_promotion_codes: true,
      ...(userEmail ? { customer_email: userEmail } : {}),
      metadata: {
        plan,
        billing,
        ...(userEmail ? { user_email: userEmail } : {}),
      },
    })

    if (!session.url) {
      console.error('[checkout/route] Stripe session created without URL')
      return NextResponse.json(
        { error: 'SESSION_ERROR', message: 'Could not create checkout session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[checkout/route] Unexpected error:', error)
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
