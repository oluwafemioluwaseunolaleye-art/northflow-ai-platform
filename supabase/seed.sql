-- OPTIONAL, clearly-labeled example data for local development only.
-- The app itself never fabricates leads — this file is not run
-- automatically by anything; run it manually against a dev/staging
-- Supabase project if you want sample rows to click through the UI with:
--
--   psql "$DATABASE_URL" -f supabase/seed.sql
--
-- Do NOT run this against production.

insert into public.leads
  (name, email, phone, company, service, budget, timeline, description, status)
values
  ('Ava Brennan', 'ava@brennanrealty.example', '+1 555-0101', 'Brennan Realty',
   'Lead Qualification', 8500, '1 month',
   'Need AI to qualify inbound buyer leads before they hit our agents.', 'new'),
  ('Marcus Webb', 'marcus@webbhomeservices.example', '+1 555-0102', 'Webb Home Services',
   'Automated Follow-Up', 1500, 'Flexible',
   'Just exploring options, no fixed timeline yet.', 'new'),
  ('Priya Nair', 'priya@nairfinancial.example', '+1 555-0103', 'Nair Financial',
   'Appointment Booking', 6000, '2 weeks',
   'We get ~40 inbound calls/week and need booking automated end to end.', 'contacted'),
  ('Devon Clarke', 'devon@clarkeconsulting.example', '+1 555-0104', 'Clarke Consulting',
   'Full Platform', 12000, 'Immediate',
   'Budget approved, ready to start this week. Need qualification, follow-up, and booking.', 'booked');
