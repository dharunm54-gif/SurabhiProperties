import React from "react";
import Link from "next/link";
import { Property } from "@/types/models";
import { PropertyCard } from "@/components/properties/property-card";
import { ArrowRight } from "lucide-react";

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
              Verified Listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
              Featured Properties in Thanjavur
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Carefully vetted residential plots, homes, and commercial properties with verified documents.
            </p>
          </div>

          <Link
            href="/properties"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#173F35] hover:text-[#C7A45D] transition-colors"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
