import React from "react";
import { siteConfig } from "@/lib/config/site";
import { Phone, MessageSquare, Award, CheckCircle } from "lucide-react";

export function ConsultantProfile() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173F35] text-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-16">
            {/* Consultant Photo & Quick Badge */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#C7A45D]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.consultant.photo}
                  alt={siteConfig.consultant.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F5447] text-[#C7A45D] text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  {siteConfig.consultant.experience}
                </span>
              </div>
            </div>

            {/* Consultant Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
                  Meet the Consultant
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  {siteConfig.consultant.name}
                </h2>
                <p className="text-sm font-semibold text-gray-300">
                  {siteConfig.consultant.title} • Surabi Properties
                </p>
              </div>

              <blockquote className="border-l-4 border-[#C7A45D] pl-4 italic text-gray-200 text-sm sm:text-base leading-relaxed">
                &ldquo;In property deals, haste is your enemy and honest paperwork is your only true shield.
                My commitment to every family is identical to how I would advise my own children.&rdquo;
              </blockquote>

              <p className="text-sm text-gray-300 leading-relaxed">
                {siteConfig.consultant.bio}
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] shrink-0" />
                  <span>Personal scrutiny of revenue records and encumbrance certificates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] shrink-0" />
                  <span>Direct liaison with bank legal officers for fast loan sanctions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] shrink-0" />
                  <span>Unbiased valuation assessment based on actual market benchmarks</span>
                </div>
              </div>

              {/* Direct Reach Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-bold text-sm px-6 py-3 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Consultant Directly</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1F5447] hover:bg-[#1F5447]/80 text-white font-semibold text-sm px-6 py-3 rounded-md border border-white/20 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
