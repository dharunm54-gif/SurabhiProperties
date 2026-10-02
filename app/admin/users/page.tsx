import React from "react";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    {
      id: "u1",
      email: "owner@surabiproperties.in",
      fullName: "",
      role: "owner",
      status: "active",
      createdAt: "1 Jan 2026",
    },
    {
      id: "u2",
      email: "admin@surabiproperties.in",
      fullName: "System Administrator",
      role: "admin",
      status: "active",
      createdAt: "1 Jan 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Authorized Staff Users</h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage authenticated users with access to Owner and Admin dashboards.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#173F35] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs hover:bg-[#1F5447] transition-colors cursor-pointer">
          <UserPlus className="w-4 h-4 text-[#C7A45D]" />
          <span>Invite New User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-bold text-[#173F35]">{u.fullName}</td>
                <td className="py-4 px-6 text-gray-600 text-xs">{u.email}</td>
                <td className="py-4 px-6">
                  <Badge variant={u.role === "admin" ? "gold" : "green"}>
                    {u.role.toUpperCase()}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-gray-400">{u.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
