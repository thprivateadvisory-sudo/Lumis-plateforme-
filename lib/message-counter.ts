import { getSupabaseAdmin } from './supabase'
import { getUserPlan, isUnlimited } from './subscription'

const MESSAGE_LIMIT = 20

export interface CountStatus {
  count: number
  limit: number
  unlimited: boolean
  blocked: boolean
}

function countKey(agentSlug: string): string {
  return `msg_count_${agentSlug || 'demo'}`
}

export async function getCountStatus(
  userId: string,
  userEmail: string,
  agentSlug: string
): Promise<CountStatus> {
  const plan = await getUserPlan(userEmail)

  if (isUnlimited(plan)) {
    return { count: 0, limit: Infinity, unlimited: true, blocked: false }
  }

  const { data } = await getSupabaseAdmin().auth.admin.getUserById(userId)
  const meta = data?.user?.user_metadata ?? {}
  const count: number = meta[countKey(agentSlug)] ?? 0

  return {
    count,
    limit: MESSAGE_LIMIT,
    unlimited: false,
    blocked: count >= MESSAGE_LIMIT,
  }
}

export async function incrementCount(
  userId: string,
  userEmail: string,
  agentSlug: string
): Promise<CountStatus> {
  const plan = await getUserPlan(userEmail)

  if (isUnlimited(plan)) {
    return { count: 0, limit: Infinity, unlimited: true, blocked: false }
  }

  const { data } = await getSupabaseAdmin().auth.admin.getUserById(userId)
  const meta = data?.user?.user_metadata ?? {}
  const key = countKey(agentSlug)
  const newCount: number = (meta[key] ?? 0) + 1

  await getSupabaseAdmin().auth.admin.updateUserById(userId, {
    user_metadata: { ...meta, [key]: newCount },
  })

  return {
    count: newCount,
    limit: MESSAGE_LIMIT,
    unlimited: false,
    blocked: newCount >= MESSAGE_LIMIT,
  }
}
