# Supabase

This folder holds Supabase project configuration that lives alongside the
application code (not the Supabase project itself, which is managed in the
Supabase dashboard / CLI).

- `migrations/` — SQL migration files, managed via the Supabase CLI
  (`supabase migration new <name>`), applied with `supabase db push`.

No schema has been defined yet — tables for leads, automations,
appointments, etc. will be added here once the dashboard build begins.
