import React from "react";
import Link from "next/link";
import { Post } from "@/types/models";
import { StoryCard } from "@/components/stories/story-card";
import { ArrowRight } from "lucide-react";

export function StoriesPreview({ stories }: { stories: Post[] }) {
  return (
    <section className="py-20 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
              Consultancy Pulse
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
              Surabi Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Real client milestones, bank loan success stories, and local real estate infrastructure updates.
            </p>
          </div>

          <Link
            href="/stories"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#173F35] hover:text-[#C7A45D] transition-colors"
          >
            <span>Read All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.slice(0, 3).map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
