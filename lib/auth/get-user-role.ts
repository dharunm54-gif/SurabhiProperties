/**
 * lib/auth/get-user-role.ts
 *
 * Retrieves the authenticated user's role from the public.users table.
 * Returns null if user is not logged in or has no role record.
 */
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/models";

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    console.error("[getUserRole] Error:", error?.message);
    return null;
  }

  return data.role as UserRole;
}

export async function getUserWithRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return data;
}
