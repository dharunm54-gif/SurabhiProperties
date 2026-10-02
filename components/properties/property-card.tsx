import React from "react";
import Link from "next/link";
import { Property } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize2, ArrowRight } from "lucide-react";
import { formatArea } from "@/lib/utils/format";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E0D8] overflow-hidden shadow-sm hover:shadow-md hover:border-[#C7A45D]/60 transition-all flex flex-col group">
      {/* Cover Image */}
      <div className="relative h-52 sm:h-56 w-full bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.cover_image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="green" className="bg-[#173F35] text-white border-none shadow-sm">
            {property.property_type}
          </Badge>
          {property.is_featured && (
            <Badge variant="gold" className="bg-[#C7A45D] text-[#173F35] font-bold border-none shadow-sm">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-[#173F35]/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {property.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C7A45D] shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-[#173F35] line-clamp-2 group-hover:text-[#1F5447] transition-colors">
            {property.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Price & Specs */}
        <div className="pt-3 border-t border-[#E2E0D8]/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Expected Price</p>
              <p className="text-lg font-bold text-[#173F35]">{property.price_label || "Price on request"}</p>
            </div>

            {property.area_sqft && (
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">Plot / Built Area</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                  <Maximize2 className="w-3 h-3 text-[#C7A45D]" />
                  <span>{formatArea(property.area_sqft)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-[#E2E0D8]/40">
            <Link
              href={`/property/${property.slug}`}
              className="text-xs font-bold text-[#173F35] hover:text-[#C7A45D] flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href={`/contact?property=${encodeURIComponent(property.title)}`}
              className="bg-[#173F35] hover:bg-[#1F5447] text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
