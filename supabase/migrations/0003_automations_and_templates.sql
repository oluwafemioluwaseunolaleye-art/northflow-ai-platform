-- Part 6: automation builder + email workflow templates.
-- Run via `supabase db push` (or paste into the SQL editor).

alter table public.automations
  add column if not exists description text,
  add column if not exists trigger_label text,
  add column if not exists actions jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

-- Lets us seed/update by name idempotently.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'automations_name_key'
  ) then
    alter table public.automations add constraint automations_name_key unique (name);
  end if;
end $$;

-- The single seeded automation representing the workflow visualized on the
-- Automations page. Its name intentionally matches the automation_name
-- logged by runQualification() (lib/actions/leads.ts), so running AI
-- qualification on a lead shows up here as activity automatically.
insert into public.automations (name, description, trigger_label, actions, active)
values (
  'AI Qualification',
  'Reads every new lead, checks budget and requirements, and routes it to the right email and team notification automatically.',
  'New Lead Submitted',
  '["Analyze Lead", "Check Budget", "Determine Qualification", "Send Email", "Update Airtable", "Notify Team"]'::jsonb,
  true
)
on conflict (name) do nothing;

create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in ('qualified', 'not_qualified')),
  subject text not null,
  body text not null,
  booking_link text,
  follow_up_instructions text,
  updated_at timestamptz not null default now()
);

-- Default templates, editable in the UI. The not_qualified copy is
-- intentionally professional and never states "you are not qualified" —
-- components/automations/EmailTemplateEditor.tsx also blocks saving that
-- exact phrase as a defense-in-depth check.
insert into public.email_templates (key, subject, body, booking_link)
values (
  'qualified',
  'Let''s find 30 minutes this week',
  E'Hi {{first_name}},\n\nThanks for reaching out to NorthFlow AI — based on what you shared, this looks like a strong fit for what we do.\n\nI''d like to grab 30 minutes to walk through your goals and show you exactly how this would work for {{company}}.\n\n{{booking_link}}\n\nTalk soon,\nThe NorthFlow AI Team',
  'https://tally.so/r/jaX7Za'
)
on conflict (key) do nothing;

insert into public.email_templates (key, subject, body, follow_up_instructions)
values (
  'not_qualified',
  'Thanks for reaching out to NorthFlow AI',
  E'Hi {{first_name}},\n\nThank you for telling us about {{company}} — we appreciate you taking the time.\n\nBased on what you''ve shared, we don''t think now is the right time for us to work together, but we didn''t want to leave you without a next step.\n\n{{resources_link}}\n\nIf your budget or timeline changes, we''d love to hear from you again.\n\nWarmly,\nThe NorthFlow AI Team',
  'Add lead to the 90-day nurture sequence and re-check budget/timeline automatically.'
)
on conflict (key) do nothing;
