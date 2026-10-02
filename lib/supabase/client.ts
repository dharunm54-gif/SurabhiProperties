/**
 * lib/supabase/client.ts
 *
 * Browser-side Supabase client.
 * Use in Client Components ("use client") only.
 * Uses the ANON key — safe to expose to the browser.
 * RLS policies enforce what this client can access.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
