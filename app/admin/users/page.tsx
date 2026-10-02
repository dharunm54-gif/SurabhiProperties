import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";
import { UserPlus, ShieldCheck, User } from "lucide-react";
import { inviteUser } from "./actions";
import { formatDate } from "@/lib/utils/format";

async function getUsers() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("[Admin Users] Error:", error?.message);
      return [
        { id: "u1", email: "owner.surabiproperties@gmail.com", full_name: "Shenthil Kumar", role: "owner", is_active: true, created_at: new Date().toISOString() },
      ];
    }
    return data;
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Authorized Staff Users</h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage authenticated users with access to Owner and Admin dashboards.
          </p>
        </div>
      </div>

      {/* Create New User Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#173F35]/10 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-[#173F35]" />
          </div>
          <h3 className="text-base font-bold text-[#173F35]">Add New Staff Account</h3>
        </div>

        <form action={inviteUser} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Full Name</label>
            <input
              name="full_name"
              type="text"
              placeholder="e.g. Ramesh Kumar"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#173F35]/30 focus:border-[#173F35]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Email Address *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. ramesh@surabiproperties.in"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#173F35]/30 focus:border-[#173F35]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Password *</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#173F35]/30 focus:border-[#173F35]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Role *</label>
            <select
              name="role"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#173F35]/30 focus:border-[#173F35] bg-white"
            >
              <option value="owner">Owner (Consultant)</option>
              <option value="admin">Admin (System Manager)</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#173F35] hover:bg-[#1F5447] text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#C7A45D]" />
              <span>Create Staff Account</span>
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#173F35]">
            Staff Accounts ({users.length})
          </h3>
        </div>

        {users.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No users found. Create the first account above.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {u.full_name ? u.full_name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-[#173F35]">{u.full_name || "—"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-xs font-mono">{u.email}</td>
                  <td className="py-4 px-6">
                    <Badge variant={u.role === "admin" ? "gold" : "green"}>
                      {u.role === "admin" ? (
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> ADMIN</span>
                      ) : (
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> OWNER</span>
                      )}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${u.is_active ? "text-emerald-700" : "text-gray-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${u.is_active ? "bg-emerald-500" : "bg-gray-300"}`}></span>
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-400">
                    {u.created_at ? formatDate(u.created_at) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
