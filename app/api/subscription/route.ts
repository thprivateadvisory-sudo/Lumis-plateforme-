import { NextRequest, NextResponse } from 'next/server'
import { getUserSubscription, getUserPlan } from '@/lib/subscription'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'MISSING_EMAIL' }, { status: 400 })
  }

  const [plan, subscription] = await Promise.all([
    getUserPlan(email),
    getUserSubscription(email),
  ])

  return NextResponse.json({
    plan,
    subscription: subscription
      ? {
          billing: subscription.billing,
          status: subscription.status,
          created_at: subscription.created_at,
        }
      : null,
  })
}
