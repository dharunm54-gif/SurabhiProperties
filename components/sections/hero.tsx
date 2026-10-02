import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-[#173F35] text-white overflow-hidden py-16 lg:py-24">
      {/* Subtle background decorative pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5447] border border-[#C7A45D]/30 text-xs font-semibold text-[#C7A45D] tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-[#C7A45D]" />
              <span>15+ Years of Honest Real Estate Consultation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Find the right property. <br />
              <span className="text-[#C7A45D]">Make the right move.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
              From DTCP approved plots and independent homes to seamless bank loan approvals,
              Surabi Properties provides transparent, verified, and personal guidance for every
              property decision in Thanjavur.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-bold text-sm sm:text-base px-7 py-3.5 rounded-md shadow-md transition-all active:scale-98"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-[#1F5447] hover:bg-[#1F5447]/80 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-md border border-white/20 transition-all active:scale-98"
              >
                <PhoneCall className="w-4 h-4 text-[#C7A45D]" />
                <span>Talk to Consultant</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-[#1F5447] grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">450+</p>
                <p className="text-xs text-gray-300 mt-0.5">Properties Assisted</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#C7A45D]">100%</p>
                <p className="text-xs text-gray-300 mt-0.5">Legal Clear Titles</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">₹35+ Cr</p>
                <p className="text-xs text-gray-300 mt-0.5">Loans Facilitated</p>
              </div>
            </div>
          </div>

          {/* Right: Authentic Property Imagery */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1F5447]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Surabi Properties Thanjavur Consultation"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F35] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#173F35]/90 backdrop-blur-sm rounded-xl border border-white/10 text-white">
                <p className="text-xs text-[#C7A45D] font-semibold uppercase tracking-wider">
                  Direct Consultant Engagement
                </p>
                <p className="text-sm font-medium mt-0.5">
                  &ldquo;Every document checked in person before you put a single rupee.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
