import React from "react";
import { siteConfig } from "@/lib/config/site";

export default function AdminContentPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">Website Content &amp; Copy</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review live copy and SEO text deployed across the public customer website.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4 text-xs text-gray-700">
        <div>
          <strong className="block text-sm text-[#173F35]">Hero Headline</strong>
          <p className="mt-1 bg-gray-50 p-3 rounded">{siteConfig.tagline}</p>
        </div>

        <div>
          <strong className="block text-sm text-[#173F35]">Main Business Description</strong>
          <p className="mt-1 bg-gray-50 p-3 rounded">{siteConfig.description}</p>
        </div>

        <div>
          <strong className="block text-sm text-[#173F35]">Senior Consultant Biography</strong>
          <p className="mt-1 bg-gray-50 p-3 rounded">{siteConfig.consultant.bio}</p>
        </div>
      </div>
    </div>
  );
}
