import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 bg-[#173F35] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#1F5447] text-[#C7A45D] text-xs font-bold uppercase tracking-widest border border-[#C7A45D]/30">
          Start Your Property Journey
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Planning your next property move in Thanjavur?
        </h2>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Whether you are evaluating a plot investment, planning a home loan, or seeking clear-title verification,
          speak directly with Mr.Shenthil Kumar Sundaramoorthy for unbiased, expert counsel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-bold text-sm sm:text-base px-8 py-3.5 rounded-md shadow-md transition-all active:scale-98"
          >
            <span>Talk to a Consultant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-md transition-all active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F5447] hover:bg-[#1F5447]/80 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-md border border-white/20 transition-all active:scale-98"
          >
            <Phone className="w-4 h-4 text-[#C7A45D]" />
            <span>Call Now</span>
          </a>
        </div>

        <p className="text-xs text-gray-400 pt-4">
          No obligation • Clear documentation assistance • Genuine local expertise
        </p>
      </div>
    </section>
  );
}
