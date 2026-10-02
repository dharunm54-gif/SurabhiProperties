import React from "react";
import { siteConfig } from "@/lib/config/site";

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#173F35] mb-6">Terms of Service</h1>
      <div className="bg-white p-8 rounded-2xl border border-[#E2E0D8] space-y-4 text-sm text-gray-700 leading-relaxed">
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        <p>Welcome to {siteConfig.name}. By accessing or using our website, you agree to comply with and be bound by the following terms.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">1. Informational Purpose</h2>
        <p>The listings, pricing, and advice presented on this website are provided for informational and consultation-scheduling purposes. Final legal commitments, land measurements, encumbrance verification, and price negotiations are conducted face-to-face with the relevant property owners and legal advisors.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">2. Bank Loans</h2>
        <p>Loan sanctioning is governed strictly by the independent credit and legal policies of the respective banks (such as SBI, HDFC, Canara). While we provide expert documentation assistance, final sanctions are granted at the sole discretion of the lending institution.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">3. Intellectual Property</h2>
        <p>All logos, imagery, and text content associated with {siteConfig.name} are the intellectual property of Surabi Properties.</p>
      </div>
    </div>
  );
}
