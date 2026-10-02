import React from "react";
import { Testimonial } from "@/types/models";
import { siteConfig } from "@/lib/config/site";
import { Star, ExternalLink, Quote } from "lucide-react";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-20 bg-white border-t border-[#E2E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
            What Families Say About Surabi Properties
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Genuine experiences from individuals, retirees, and families who consulted with us on their property and loan requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#F8F7F3] p-8 rounded-2xl border border-[#E2E0D8] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#C7A45D]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C7A45D]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#C7A45D]/40" />

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E0D8]/60">
                <p className="font-bold text-[#173F35] text-sm">{test.name}</p>
                {test.location && (
                  <p className="text-xs text-gray-500 mt-0.5">{test.location}</p>
                )}
                {test.source === "google" && (
                  <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#173F35] bg-[#173F35]/10 px-2 py-0.5 rounded">
                    Verified Google Review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Banner */}
        <div className="mt-14 p-6 bg-[#173F35]/5 rounded-2xl border border-[#173F35]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-base font-bold text-[#173F35]">
              Read Genuine Feedback on Google Business Profile
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Every review reflects real face-to-face transactions and consultation in Thanjavur.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={siteConfig.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#173F35] text-white text-xs font-semibold rounded-md hover:bg-[#1F5447] transition-colors"
            >
              <span>See More on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={siteConfig.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C7A45D] text-[#173F35] text-xs font-bold rounded-md hover:bg-[#D4B87A] transition-colors"
            >
              <span>Write a Google Review</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
