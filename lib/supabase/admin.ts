/**
 * lib/supabase/admin.ts
 *
 * Admin Supabase client using the SERVICE ROLE key.
 *
 * ⚠️  SECURITY CRITICAL:
 * - NEVER import this file in Client Components or browser code.
 * - NEVER use NEXT_PUBLIC_ prefix for SUPABASE_SERVICE_ROLE_KEY.
 * - Only use in server-only contexts: API routes, Server Actions.
 * - This client BYPASSES Row Level Security.
 *
 * Use ONLY for:
 * - Creating users (admin user management)
 * - Operations that explicitly need to bypass RLS
 */
import { createClient } from "@supabase/supabase-js";

// This function should only ever be called server-side.
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
