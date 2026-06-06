-- ============================================================
-- Cohesif IA — Schema Supabase
-- Coller dans SQL Editor > New query > Run
-- ============================================================

-- Table des abonnements Stripe
create table if not exists public.subscriptions (
  id               uuid primary key default gen_random_uuid(),
  customer_email   text not null unique,
  plan             text not null default 'free',
  billing          text not null default 'monthly',
  status           text not null default 'active',
  stripe_customer_id text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Index pour lookup rapide par email
create index if not exists subscriptions_email_idx
  on public.subscriptions (customer_email);

-- Index pour lookup par customer Stripe
create index if not exists subscriptions_stripe_idx
  on public.subscriptions (stripe_customer_id);

-- Row Level Security : lecture autorisée côté service role uniquement
-- (on utilise la service_role key dans les API routes)
alter table public.subscriptions enable row level security;

-- Politique : les service roles peuvent tout faire (API routes backend)
create policy "service_role_all" on public.subscriptions
  for all
  using (true)
  with check (true);

-- Trigger pour mettre à jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ============================================================
-- Vérification : doit afficher la table créée
-- ============================================================
select table_name from information_schema.tables
where table_schema = 'public' and table_name = 'subscriptions';
