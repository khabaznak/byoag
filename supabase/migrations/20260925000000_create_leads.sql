create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  organization text check (organization is null or char_length(organization) <= 160),
  interest text not null check (char_length(interest) between 1 and 3000),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- No anon/authenticated policies: public clients cannot read or write leads.
-- The Cloudflare Pages Function inserts using a server-only service role key.
revoke all on table public.leads from public, anon, authenticated;
grant insert on table public.leads to service_role;
