import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components. Reads the public URL/anon
 * key from env — see .env.example. Safe to call multiple times; Supabase
 * handles the underlying singleton.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
