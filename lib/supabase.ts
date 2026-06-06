import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _anon: SupabaseClient | null = null
let _admin: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_anon) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'
    _anon = createClient(url, key)
  }
  return _anon
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _admin
}
