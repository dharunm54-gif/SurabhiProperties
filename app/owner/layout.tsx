"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ownerNav } from "@/lib/config/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Newspaper,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Newspaper: <Newspaper className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  CalendarDays: <CalendarDays className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#173F35] text-white flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#1F5447]">
            <Link href="/" className="block">
              <span className="text-lg font-bold tracking-tight text-white">
                SURABI PROPERTIES
              </span>
              <p className="text-[10px] uppercase tracking-widest text-[#C7A45D] font-semibold">
                Owner Dashboard
              </p>
            </Link>
          </div>

          {/* Navigation items */}
          <nav className="p-4 space-y-1">
            {ownerNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/owner/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#C7A45D] text-[#173F35] font-bold"
                      : "text-gray-300 hover:text-white hover:bg-[#1F5447]"
                  )}
                >
                  {iconMap[item.icon] || <LayoutDashboard className="w-5 h-5" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#1F5447] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-[#1F5447] transition-colors"
          >
            <span>View Public Site</span>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-xs">
          <h1 className="text-lg font-bold text-[#173F35]">
            Consultancy Management Console
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">
              Shenthil Kumar (Owner)
            </span>
            <div className="w-8 h-8 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-xs">
              RS
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
