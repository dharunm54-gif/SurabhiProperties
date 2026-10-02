"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import { publicNav } from "@/lib/config/navigation";
import { Phone, MessageSquare, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#173F35] text-white shadow-md">
      {/* Top micro-bar for direct contact */}
      <div className="border-b border-[#1F5447] text-xs py-1.5 px-4 sm:px-8 hidden md:flex justify-between items-center text-gray-200">
        <div className="flex items-center space-x-4">
          <span>📍 {siteConfig.address.city}, Tamil Nadu</span>
          <span>⏰ {siteConfig.workingHours.weekdays}</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="hover:text-[#C7A45D] transition-colors flex items-center gap-1 font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#C7A45D]" /> {siteConfig.phone}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C7A45D] transition-colors flex items-center gap-1 font-medium text-emerald-400"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#C7A45D] transition-colors">
              SURABI PROPERTIES
            </span>
            <span className="text-[10px] tracking-widest text-[#C7A45D] uppercase font-semibold">
              Real Estate & Loan Consultancy
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {publicNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-white bg-[#1F5447]"
                      : "text-gray-200 hover:text-white hover:bg-[#1F5447]/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Call-to-action */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/contact"
              className="bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-semibold text-sm px-5 py-2.5 rounded-md shadow-sm transition-all flex items-center gap-2"
            >
              Talk to Us
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#1F5447] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#173F35] border-t border-[#1F5447] px-4 pt-2 pb-6 space-y-2">
          {publicNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-base font-medium rounded-md transition-colors",
                  isActive
                    ? "text-white bg-[#1F5447]"
                    : "text-gray-200 hover:text-white hover:bg-[#1F5447]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#1F5447] flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-semibold text-sm py-2.5 rounded-md"
            >
              Talk to a Consultant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
