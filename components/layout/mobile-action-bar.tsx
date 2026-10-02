import React from "react";
import { siteConfig } from "@/lib/config/site";
import { Phone, MessageSquare, MapPin } from "lucide-react";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#173F35] border-t border-[#1F5447] py-2.5 px-3 md:hidden shadow-lg flex items-center justify-around gap-2">
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#1F5447] text-white text-xs font-semibold active:scale-95 transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-[#C7A45D]" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
          "Hello Surabi Properties, I visited your website and would like to consult regarding a property / loan requirement."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#25D366] text-white text-xs font-semibold active:scale-95 transition-transform"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Directions Button */}
      <a
        href={siteConfig.mapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#C7A45D] text-[#173F35] text-xs font-semibold active:scale-95 transition-transform"
      >
        <MapPin className="w-3.5 h-3.5" />
        <span>Directions</span>
      </a>
    </div>
  );
}
