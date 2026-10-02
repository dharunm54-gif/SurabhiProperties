import React from "react";
import { siteConfig } from "@/lib/config/site";
import { MapPin, Clock, Phone, MessageSquare, Navigation } from "lucide-react";

export function MapSection() {
  return (
    <section className="py-20 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Direct Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
            Visit Our Thanjavur Office
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            We strongly encourage in-person discussions before taking any major property decision. Come visit us with your parent deeds or loan queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Office Information Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#E2E0D8] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#173F35] border-b border-[#E2E0D8]/60 pb-3">
                Surabi Properties Head Office
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#242424]">Office Address</p>
                    <p className="mt-0.5 leading-relaxed">{siteConfig.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#242424]">Consultation Hours</p>
                    <p className="mt-0.5">{siteConfig.workingHours.weekdays}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{siteConfig.workingHours.sunday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#242424]">Phone Line</p>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="hover:text-[#173F35] font-medium"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#242424]">WhatsApp Connect</p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-medium hover:underline"
                    >
                      Chat with Consultant Directly
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E0D8]/60">
              <a
                href={siteConfig.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#173F35] hover:bg-[#1F5447] text-white font-semibold text-sm py-3 px-4 rounded-md transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#C7A45D]" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E2E0D8] shadow-sm min-h-[350px] bg-gray-100">
            <iframe
              src={siteConfig.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Surabi Properties Office Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
