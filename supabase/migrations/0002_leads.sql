-- Leads + related activity tables for the Leads page and AI qualification
-- service. Run via `supabase db push` (or paste into the SQL editor).
--
-- Status values match the workflow defined in the Leads UI exactly:
-- new, qualified, not_qualified, contacted, booked, closed.
--
-- Note: getDashboardMetrics() (lib/dashboard.ts) already queries
-- leads/appointments/automations with these exact table and column names —
-- once this migration is applied and leads start flowing in, the dashboard
-- overview's metrics and AI Command Center populate automatically.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  budget numeric,
  timeline text,
  description text,
  status text not null default 'new'
    check (status in ('new', 'qualified', 'not_qualified', 'contacted', 'booked', 'closed')),
  -- Set by lib/ai/qualification.ts — distinct from the workflow `status`
  -- above (a lead can be AI-qualified but still sitting in "new" until a
  -- human moves it to "contacted", etc.)
  qualification_status text
    check (qualification_status in ('qualified', 'not_qualified', 'needs_review')),
  qualification_score int check (qualification_score between 0 and 100),
  qualification_reason text,
  qualified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_emails (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  direction text not null check (direction in ('inbound', 'outbound')),
  subject text,
  snippet text,
  sent_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete set null,
  scheduled_at timestamptz,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.automations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.automation_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete cascade,
  automation_name text not null,
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id);
create index if not exists lead_emails_lead_id_idx on public.lead_emails (lead_id);
create index if not exists appointments_lead_id_idx on public.appointments (lead_id);
create index if not exists automation_activity_lead_id_idx on public.automation_activity (lead_id);
