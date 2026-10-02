import React from "react";
import { getProperties } from "@/lib/services/properties";
import { PropertyCard } from "@/components/properties/property-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale in Thanjavur",
  description: "Browse verified DTCP approved plots, independent houses, villas, and commercial properties in Thanjavur. Clear titles and bank loan assistance.",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const properties = await getProperties({ property_type: type });

  const categories = [
    { label: "All Properties", value: "" },
    { label: "Plots / Layouts", value: "plot" },
    { label: "Houses & Villas", value: "house" },
    { label: "Commercial Plots", value: "commercial" },
    { label: "Farmlands", value: "agricultural" },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Verified Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#173F35] mt-2">
            Available Properties in Thanjavur
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Every property listed here has undergone legal title verification. Direct owner/consultant dealing with zero hidden markup.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = (!type && cat.value === "") || type === cat.value;
            return (
              <a
                key={cat.value}
                href={cat.value ? `/properties?type=${cat.value}` : "/properties"}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#173F35] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-[#E2E0D8] hover:border-[#173F35]"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Property Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E2E0D8] max-w-lg mx-auto p-8">
            <h3 className="text-lg font-bold text-[#173F35]">No properties currently match this category</h3>
            <p className="text-sm text-gray-500 mt-2">
              We frequently source unlisted off-market plots tailored to specific requirements.
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 bg-[#C7A45D] text-[#173F35] font-bold text-xs px-5 py-2.5 rounded-md"
            >
              Submit Custom Requirement
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
