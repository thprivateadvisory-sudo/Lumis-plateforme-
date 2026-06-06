import { getSupabase } from './supabase'

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabase()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cohesif-ia.fr'
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteUrl}/dashboard`,
    },
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  const supabase = getSupabase()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const supabase = getSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function resetPassword(email: string) {
  const supabase = getSupabase()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cohesif-ia.fr'
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/dashboard?reset=true`,
  })
  return { error }
}
