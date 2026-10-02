"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PROPERTY_TYPES, PROPERTY_STATUSES } from "@/lib/config/constants";
import { ArrowLeft, Save, Check } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    property_type: "plot",
    location: "",
    city: "Thanjavur",
    area_sqft: "",
    price_label: "",
    description: "",
    cover_image_url: "",
    status: "available",
    is_featured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          area_sqft: formData.area_sqft ? Number(formData.area_sqft) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create property listing");
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/owner/properties");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create property";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/owner/properties"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C7A45D]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Properties</span>
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Add New Property Listing</h2>
          <p className="text-xs text-gray-500 mt-1">
            Provide verified details. Once saved, it will immediately appear on the public website and owner dashboard.
          </p>
        </div>

        {isSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Property created successfully! Redirecting to properties list...</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Property Title: *"
            required
            placeholder="e.g. DTCP Approved Residential Plots near New Bus Stand"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Property Type:"
              options={PROPERTY_TYPES.map((p) => ({ value: p.value, label: p.label }))}
              value={formData.property_type}
              onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
            />

            <Input
              label="Location / Area: *"
              required
              placeholder="e.g. Raja Rajan Nagar"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <Input
              label="City:"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Area in Sq.Ft:"
              type="number"
              placeholder="e.g. 1800"
              value={formData.area_sqft}
              onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
            />

            <Input
              label="Price Label: *"
              required
              placeholder="e.g. ₹32 Lakhs"
              value={formData.price_label}
              onChange={(e) => setFormData({ ...formData, price_label: e.target.value })}
            />

            <Select
              label="Status:"
              options={PROPERTY_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>

          <Input
            label="Cover Image URL (Web URL or Supabase Storage):"
            placeholder="https://images.unsplash.com/..."
            value={formData.cover_image_url}
            onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
          />

          <Textarea
            label="Property Description: *"
            required
            rows={5}
            placeholder="Describe layout approvals, road width, facing, water table, bank loan arrangements, etc."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 rounded text-[#173F35] focus:ring-[#173F35]"
            />
            <label htmlFor="is_featured" className="text-xs font-semibold text-gray-700">
              Highlight as Featured Property on Homepage
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <Button type="submit" isLoading={isLoading} size="lg">
              <Save className="w-4 h-4 mr-2" />
              <span>Publish Property</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
