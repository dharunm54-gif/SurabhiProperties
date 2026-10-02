import React from "react";
import { getStories } from "@/lib/services/stories";
import { StoryCard } from "@/components/stories/story-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surabi Stories | Real Estate & Loan Insights",
  description: "Read real client success stories, bank loan sanction milestones, DTCP guidelines, and Thanjavur infrastructure updates from Surabi Properties.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Updates &amp; Milestones
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#173F35] mt-2">
            Surabi Stories
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Real milestone celebrations, bank loan approvals, legal advice, and on-ground development insights from our consultancy desk.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
