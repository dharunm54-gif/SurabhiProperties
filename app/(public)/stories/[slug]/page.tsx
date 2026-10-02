import React from "react";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/services/stories";
import { siteConfig } from "@/lib/config/site";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getStoryBySlug(slug);
  if (!post) return { title: "Story Not Found" };

  return {
    title: `${post.title} | Surabi Stories`,
    description: post.description.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getStoryBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 md:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C7A45D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Surabi Stories</span>
        </Link>

        {/* Post Meta & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="gold">{post.category.replace("_", " ")}</Badge>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C7A45D]" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#173F35] leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <div className="rounded-2xl overflow-hidden border border-[#E2E0D8] bg-gray-100 shadow-sm max-h-[450px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E2E0D8] shadow-xs space-y-6">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line font-normal">
            {post.description}
          </p>

          <div className="pt-6 border-t border-[#E2E0D8]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-500">
            <div>
              <p className="font-semibold text-[#173F35]">{siteConfig.name}</p>
              <p>Consultancy Desk • Thanjavur</p>
            </div>
            <Link
              href="/contact"
              className="bg-[#173F35] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#1F5447] transition-colors"
            >
              Discuss Your Requirement
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
