import React from "react";
import { siteConfig } from "@/lib/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#173F35] mb-6">Privacy Policy</h1>
      <div className="bg-white p-8 rounded-2xl border border-[#E2E0D8] space-y-4 text-sm text-gray-700 leading-relaxed">
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        <p>At {siteConfig.name}, we are deeply committed to respecting and protecting the privacy of our clients and website visitors.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">1. Information We Collect</h2>
        <p>We only collect personal information that you voluntarily provide to us when submitting a property requirement or contact inquiry (such as your name, phone number, email address, preferred location, and budget).</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">2. How We Use Your Information</h2>
        <p>Your details are used exclusively by our senior consultant to discuss your property requirements, schedule office visits, and provide tailored bank loan advice. We do not sell, rent, or trade your contact information with any third-party marketing companies.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">3. Sensitive Data</h2>
        <p>We never collect or store sensitive financial credentials, passwords, Aadhaar numbers, or OTPs on this website.</p>
        <h2 className="text-base font-bold text-[#173F35] pt-2">4. Contacting Us</h2>
        <p>If you have any questions regarding this policy, you may reach out directly to us at {siteConfig.email} or call {siteConfig.phone}.</p>
      </div>
    </div>
  );
}
