"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Post } from "@/types/models";
import { Heart, MessageSquare, Share2, Calendar, Check } from "lucide-react";
import { formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export function StoryCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = async () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes((prev) => prev + 1);

    try {
      await fetch(`/api/stories/${post.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: "vis_" + Math.random().toString(36).substring(2, 9),
        }),
      });
    } catch {
      // Keep optimistic like in client view
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/stories/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description.substring(0, 100),
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E0D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Post Image */}
        {post.image_url && (
          <div className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="gold" className="bg-[#C7A45D] text-[#173F35] font-bold shadow-xs">
                {post.category.replace("_", " ")}
              </Badge>
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center text-xs text-gray-400 gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C7A45D]" />
            <span>{formatDate(post.published_at || post.created_at)}</span>
          </div>

          <Link href={`/stories/${post.slug}`} className="block group">
            <h3 className="font-bold text-lg text-[#173F35] group-hover:text-[#1F5447] transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Social Engagement Bar */}
      <div className="px-6 py-3.5 bg-gray-50/70 border-t border-[#E2E0D8]/60 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
              hasLiked ? "text-red-500" : "hover:text-red-500 text-gray-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span>{likes}</span>
          </button>

          <Link
            href={`/stories/${post.slug}#comments`}
            className="flex items-center gap-1.5 font-semibold hover:text-[#173F35] text-gray-600 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span>{post.comments_count || 0}</span>
          </Link>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 font-semibold hover:text-[#173F35] text-gray-500 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
