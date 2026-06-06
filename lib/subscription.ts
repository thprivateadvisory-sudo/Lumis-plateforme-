import { getSupabaseAdmin } from './supabase'

export type PlanType = 'free' | 'pro' | 'business'

interface Subscription {
  plan: PlanType
  billing: string
  status: string
  stripe_customer_id: string | null
  created_at: string
}

export async function getUserSubscription(email: string): Promise<Subscription | null> {
  if (!email) return null

  const { data, error } = await getSupabaseAdmin()
    .from('subscriptions')
    .select('plan, billing, status, stripe_customer_id, created_at')
    .eq('customer_email', email)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) return null
  return data as Subscription
}

export async function getUserPlan(email: string): Promise<PlanType> {
  const sub = await getUserSubscription(email)
  if (!sub) return 'free'
  if (sub.plan === 'business') return 'business'
  if (sub.plan === 'pro') return 'pro'
  return 'free'
}

export function isUnlimited(plan: PlanType): boolean {
  return plan === 'pro' || plan === 'business'
}

export function planLabel(plan: PlanType): string {
  const labels: Record<PlanType, string> = {
    free: 'GRATUIT',
    pro: 'PRO',
    business: 'BUSINESS',
  }
  return labels[plan]
}

export function planColor(plan: PlanType): string {
  const colors: Record<PlanType, string> = {
    free: 'var(--fog)',
    pro: '#0BC8F0',
    business: '#a8cc00',
  }
  return colors[plan]
}
