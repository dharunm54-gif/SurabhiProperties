import React from "react";
import Link from "next/link";
import { getStories } from "@/lib/services/stories";
import { Plus, Heart, MessageSquare, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export default async function OwnerStoriesPage() {
  const stories = await getStories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Surabi Stories &amp; Updates</h2>
          <p className="text-xs text-gray-500 mt-1">
            Publish client achievements, milestone celebrations, and local property insights.
          </p>
        </div>

        <Link
          href="/owner/stories/new"
          className="inline-flex items-center gap-2 bg-[#173F35] text-white hover:bg-[#1F5447] text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C7A45D]" />
          <span>Create New Story</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-gray-100">
          {stories.map((story) => (
            <div key={story.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C7A45D]/20 text-[#8B6E28] px-2 py-0.5 rounded">
                    {story.category.replace("_", " ")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(story.published_at || story.created_at)}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#173F35]">{story.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{story.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {story.likes_count || 0} Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {story.comments_count || 0} Comments
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/stories/${story.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#173F35] px-3 py-1.5 border border-gray-200 rounded-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
