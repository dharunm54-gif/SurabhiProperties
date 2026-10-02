import React from "react";
import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/services/properties";
import { siteConfig } from "@/lib/config/site";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize2, ShieldCheck, Phone, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatArea } from "@/lib/utils/format";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | ${siteConfig.name}`,
    description: property.description?.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description?.substring(0, 160),
      images: property.cover_image_url ? [property.cover_image_url] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Back link */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C7A45D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (Left Col) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="green">{property.property_type}</Badge>
                <Badge variant="gold">{property.status.toUpperCase()}</Badge>
                {property.is_featured && <Badge variant="blue">Featured Listing</Badge>}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-[#173F35] leading-snug">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 text-[#C7A45D] shrink-0" />
                <span>{property.location}, {property.city}</span>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E0D8] bg-gray-100 shadow-sm h-72 sm:h-96 md:h-[450px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.cover_image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-6 rounded-xl border border-[#E2E0D8]">
              <div>
                <p className="text-xs text-gray-400 font-medium">Expected Price</p>
                <p className="text-xl font-bold text-[#173F35] mt-0.5">
                  {property.price_label || "Contact for Price"}
                </p>
              </div>

              {property.area_sqft && (
                <div>
                  <p className="text-xs text-gray-400 font-medium">Area / Dimension</p>
                  <div className="flex items-center gap-1.5 text-xl font-bold text-[#173F35] mt-0.5">
                    <Maximize2 className="w-4 h-4 text-[#C7A45D]" />
                    <span>{formatArea(property.area_sqft)}</span>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-400 font-medium">Legal Verification</p>
                <div className="flex items-center gap-1 text-sm font-bold text-emerald-700 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Clear Titles Verified</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E0D8] space-y-4">
              <h2 className="text-lg font-bold text-[#173F35] border-b border-[#E2E0D8]/60 pb-3">
                Property Overview &amp; Details
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Key Features List */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E0D8] space-y-4">
                <h2 className="text-lg font-bold text-[#173F35] border-b border-[#E2E0D8]/60 pb-3">
                  Highlights &amp; Approvals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C7A45D] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Direct Consultation & Enquire Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E0D8] shadow-sm space-y-6 sticky top-28">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C7A45D]">
                  Direct Consultant Support
                </p>
                <h3 className="text-xl font-bold text-[#173F35] mt-1">
                  Interested in this property?
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Call or message directly with the property title for instant site-visit scheduling, parent deed inspection, or bank loan eligibility check.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#173F35] hover:bg-[#1F5447] text-white font-bold text-sm py-3 px-4 rounded-md transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#C7A45D]" />
                  <span>Call: {siteConfig.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    `Hello Surabi Properties, I am interested in knowing more details about the listing: "${property.title}". Please advise on next steps.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white font-bold text-sm py-3 px-4 rounded-md transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E2E0D8]/60 space-y-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No fake listings or speculative pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct negotiation with owner in office</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complete bank loan facilitation assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
