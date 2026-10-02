/**
 * lib/auth/get-session.ts
 *
 * Utility to retrieve the current user session on the server.
 * Use in Server Components and Server Actions.
 */
import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("[getSession] Error retrieving session:", error.message);
    return null;
  }

  return session;
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}
