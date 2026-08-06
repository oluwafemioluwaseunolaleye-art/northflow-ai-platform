/**
 * Shared application types. Domain types (Lead, Automation, Appointment,
 * etc.) will be added here as those features are built, generated from
 * the Supabase schema once it exists (`supabase gen types typescript`).
 */

export type NavItem = {
  label: string;
  href: string;
};
