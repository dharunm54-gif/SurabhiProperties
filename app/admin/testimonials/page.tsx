import React from "react";
import { getTestimonials } from "@/lib/services/content";
import { Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Client Testimonials</h2>
          <p className="text-xs text-gray-500 mt-1">
            Display verified Google reviews and direct client feedback on the homepage.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#173F35] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs hover:bg-[#1F5447] transition-colors cursor-pointer">
          <Plus className="w-4 h-4 text-[#C7A45D]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#173F35]">{t.name}</h3>
                <p className="text-xs text-gray-400">{t.location}</p>
              </div>
              <Badge variant={t.source === "google" ? "gold" : "green"}>
                {t.source.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-[#C7A45D]">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C7A45D]" />
              ))}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50 p-3 rounded-lg border border-gray-100">
              &ldquo;{t.content}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
