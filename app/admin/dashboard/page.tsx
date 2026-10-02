import React from "react";
import Link from "next/link";
import { Users, Building2, Newspaper, Star, Trophy, Briefcase, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  const adminModules = [
    { label: "Authorized Users", href: "/admin/users", icon: <Users className="w-6 h-6 text-[#C7A45D]" />, desc: "Create staff accounts & assign roles" },
    { label: "Client Inquiries (Leads)", href: "/owner/leads", icon: <Users className="w-6 h-6 text-[#C7A45D]" />, desc: "Complete CRM database of buyer requirements" },
    { label: "Property Inventory", href: "/owner/properties", icon: <Building2 className="w-6 h-6 text-[#C7A45D]" />, desc: "Add, edit, and feature verified properties" },
    { label: "Surabi Stories Feed", href: "/owner/stories", icon: <Newspaper className="w-6 h-6 text-[#C7A45D]" />, desc: "Manage milestone updates and customer success stories" },
    { label: "Client Testimonials", href: "/admin/testimonials", icon: <Star className="w-6 h-6 text-[#C7A45D]" />, desc: "Approve and manage Google & manual reviews" },
    { label: "Achievements & Milestones", href: "/admin/achievements", icon: <Trophy className="w-6 h-6 text-[#C7A45D]" />, desc: "Update transacted properties and loan statistics" },
    { label: "Consultancy Services", href: "/admin/services", icon: <Briefcase className="w-6 h-6 text-[#C7A45D]" />, desc: "Edit titles and descriptions of services offered" },
    { label: "System & Business Settings", href: "/admin/settings", icon: <Settings className="w-6 h-6 text-[#C7A45D]" />, desc: "Configure business addresses, map links & API keys" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C7A45D] font-bold">
          System Administration
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#173F35] mt-1">
          Master Administration Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Complete control over platform content, staff permissions, and business data without touching source code.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminModules.map((mod, idx) => (
          <Link
            key={idx}
            href={mod.href}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-[#173F35] hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#173F35]/5 flex items-center justify-center group-hover:bg-[#173F35] transition-colors">
              {mod.icon}
            </div>
            <h3 className="text-base font-bold text-[#173F35] group-hover:text-[#1F5447]">
              {mod.label}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{mod.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
