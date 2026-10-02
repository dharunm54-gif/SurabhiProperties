"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { STORY_CATEGORIES } from "@/lib/config/constants";
import { ArrowLeft, Save, Check } from "lucide-react";
import Link from "next/link";

export default function NewStoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "client_success",
    image_url: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status: "published",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish story");
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/owner/stories");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to publish story";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/owner/stories"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C7A45D]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Stories</span>
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Create Surabi Story Update</h2>
          <p className="text-xs text-gray-500 mt-1">
            Publish client achievements, milestone celebrations, and local property insights. Once published, it appears on the public website and owner dashboard.
          </p>
        </div>

        {isSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Story published successfully! Redirecting...</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Story Title: *"
            required
            placeholder="e.g. ₹45 Lakhs SBI Home Loan Sanctioned in 7 Days"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Select
            label="Story Category: *"
            options={STORY_CATEGORIES.map((c) => ({
              value: c.value,
              label: `${c.emoji} ${c.label}`,
            }))}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <Input
            label="Image URL (Web URL or Supabase Storage):"
            placeholder="https://images.unsplash.com/..."
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />

          <Textarea
            label="Story Narrative / Description: *"
            required
            rows={6}
            placeholder="Share the client background, challenge resolved, bank loan facilitation details, or market advice..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <Button type="submit" isLoading={isLoading} size="lg">
              <Save className="w-4 h-4 mr-2" />
              <span>Publish Story Now</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
