import React from "react";
import { siteConfig } from "@/lib/config/site";
import { ConsultantProfile } from "@/components/sections/consultant-profile";
import { WhySurabi } from "@/components/sections/why-surabi";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { getAchievements } from "@/lib/services/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ethical Real Estate & Loan Consultancy",
  description: "Learn about Surabi Properties, our 15+ years track record in Thanjavur, and our founder Mr. Shenthil Kumar's commitment to dispute-free property guidance.",
};

export default async function AboutPage() {
  const achievements = await getAchievements();

  return (
    <div className="space-y-0">
      <div className="bg-[#173F35] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Our Foundation
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mt-2">
            About Surabi Properties
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-4 max-w-2xl mx-auto leading-relaxed">
            Founded on the bedrock of transparent deeds, personal accessibility, and strict legal verification,
            Surabi Properties has served hundreds of families across Thanjavur for over 15 years.
          </p>
        </div>
      </div>

      <ConsultantProfile />
      <WhySurabi />
      <AchievementsSection achievements={achievements} />
    </div>
  );
}
