import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { footerNav } from "@/lib/config/navigation";
import { Phone, Mail, MapPin, MessageSquare, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0E2820] text-gray-300 pt-16 pb-24 md:pb-12 border-t border-[#173F35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Philosophy */}
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              SURABI PROPERTIES
            </span>
            <p className="mt-1 text-xs tracking-wider text-[#C7A45D] uppercase font-semibold">
              Trust • Property • Growth
            </p>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#C7A45D] hover:underline"
              >
                <span>⭐ Read Reviews on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#1F5447] pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#C7A45D] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#1F5447] pb-2">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerNav.services.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#C7A45D] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-[#1F5447] pb-2">
              Office & Contact
            </h3>
            <div className="space-y-3.5 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C7A45D] shrink-0 mt-0.5" />
                <span>{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C7A45D] shrink-0" />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C7A45D] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#173F35] flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Surabi Properties. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400">
              Terms of Service
            </Link>
            <Link href="/login" className="hover:text-gray-400">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
