import React from "react";
import { getServices } from "@/lib/services/content";
import { ServicesSection } from "@/components/sections/services-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Real Estate & Loan Consultancy",
  description: "Explore our full suite of property services: plot verification, buying and selling assistance, bank loan sanction consultancy, and asset management in Thanjavur.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <div className="bg-[#173F35] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Expert Offerings
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mt-2">
            Our Consultancy Services
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-4 max-w-2xl mx-auto leading-relaxed">
            Every property transaction involves significant financial and legal commitments.
            We eliminate confusion and safeguard your interests from consultation to registration.
          </p>
        </div>
      </div>

      <ServicesSection services={services} />
      <FinalCTA />
    </div>
  );
}
