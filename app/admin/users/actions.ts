"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function inviteUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const role = formData.get("role") as "owner" | "admin";
  const password = formData.get("password") as string;

  if (!email || !role || !password) {
    console.error("[inviteUser] Missing required fields");
    return;
  }

  try {
    const supabase = createAdminClient();

    // Create auth user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role },
    });

    if (error) {
      console.error("[inviteUser] Auth error:", error.message);
      return;
    }

    if (data.user) {
      // Ensure public.users record has the correct role
      const { error: profileErr } = await supabase.from("users").upsert({
        id: data.user.id,
        email,
        full_name: fullName || null,
        role,
        is_active: true,
      });

      if (profileErr) console.error("[inviteUser] Profile error:", profileErr.message);
    }

    revalidatePath("/admin/users");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create user";
    console.error("[inviteUser] Exception:", message);
  }
}

export async function toggleUserActive(userId: string, isActive: boolean) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("users")
      .update({ is_active: !isActive, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) return { error: error.message };
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update user";
    return { error: message };
  }
}
