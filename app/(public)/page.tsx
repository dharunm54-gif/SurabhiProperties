import React from "react";
import { Hero } from "@/components/sections/hero";
import { QuickRequirement } from "@/components/sections/quick-requirement";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedProperties } from "@/components/sections/featured-properties";
import { WhySurabi } from "@/components/sections/why-surabi";
import { ConsultantProfile } from "@/components/sections/consultant-profile";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { StoriesPreview } from "@/components/sections/stories-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { MapSection } from "@/components/sections/map-section";
import { FinalCTA } from "@/components/sections/final-cta";

import { getProperties } from "@/lib/services/properties";
import { getStories } from "@/lib/services/stories";
import { getServices, getAchievements, getTestimonials } from "@/lib/services/content";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  const [properties, stories, services, achievements, testimonials] = await Promise.all([
    getProperties({ featured_only: true }),
    getStories(3),
    getServices(),
    getAchievements(),
    getTestimonials(),
  ]);

  return (
    <div className="space-y-0">
      <Hero />
      <QuickRequirement />
      <ServicesSection services={services} />
      <FeaturedProperties properties={properties} />
      <WhySurabi />
      <ConsultantProfile />
      <AchievementsSection achievements={achievements} />
      <StoriesPreview stories={stories} />
      <TestimonialsSection testimonials={testimonials} />
      <MapSection />
      <FinalCTA />
    </div>
  );
}
