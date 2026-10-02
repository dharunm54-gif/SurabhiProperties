"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/config/navigation";
import {
  LayoutDashboard,
  UserCog,
  Users,
  Building2,
  Newspaper,
  MessageSquare,
  Star,
  Trophy,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  UserCog: <UserCog className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Newspaper: <Newspaper className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0E2820] text-white flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#173F35]">
            <Link href="/" className="block">
              <span className="text-lg font-bold tracking-tight text-white">
                SURABI PROPERTIES
              </span>
              <p className="text-[10px] uppercase tracking-widest text-[#C7A45D] font-bold">
                System Administration
              </p>
            </Link>
          </div>

          {/* Navigation items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors",
                    isActive
                      ? "bg-[#C7A45D] text-[#173F35] font-bold"
                      : "text-gray-300 hover:text-white hover:bg-[#173F35]"
                  )}
                >
                  {iconMap[item.icon] || <LayoutDashboard className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#173F35] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-[#173F35] transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs text-red-300 hover:text-red-100 hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-xs">
          <h1 className="text-lg font-bold text-[#173F35]">
            Master Administrative Control
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">
              Administrator Access
            </span>
            <div className="w-8 h-8 rounded-full bg-[#C7A45D] text-[#173F35] flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
