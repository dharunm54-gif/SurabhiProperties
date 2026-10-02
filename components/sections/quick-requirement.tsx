"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INTENT_OPTIONS, PROPERTY_TYPES } from "@/lib/config/constants";
import { CheckCircle2, Send } from "lucide-react";

export function QuickRequirement() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    intent: "buy",
    property_type: "plot",
    preferred_location: "",
    budget: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit requirement");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please call us directly.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E2E0D8] p-6 sm:p-8 lg:p-10">
        <div className="mb-6 text-center sm:text-left border-b border-[#E2E0D8]/60 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#173F35]">
            What are you looking for?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Share your specific requirement. Our senior consultant will review your needs and contact you directly for a 1-on-1 discussion.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#173F35]">Requirement Received Successfully!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Thank you for placing your trust in Surabi Properties. Our consultant will review your details and contact you shortly.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: "",
                  phone: "",
                  intent: "buy",
                  property_type: "plot",
                  preferred_location: "",
                  budget: "",
                  message: "",
                });
              }}
              className="mt-4"
            >
              Submit Another Requirement
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="I am looking to:"
                options={INTENT_OPTIONS.map((i) => ({ value: i.value, label: i.label }))}
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
              />

              <Select
                label="Property Type:"
                options={PROPERTY_TYPES.map((p) => ({ value: p.value, label: p.label }))}
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
              />

              <Input
                label="Preferred Location:"
                placeholder="e.g. Near New Bus Stand"
                value={formData.preferred_location}
                onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
              />

              <Input
                label="Budget (₹):"
                placeholder="e.g. ₹35 Lakhs"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name: *"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="Phone / WhatsApp Number: *"
                required
                type="tel"
                placeholder="+91 98421 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Textarea
              label="Additional Notes / Specific Requirements (Optional):"
              rows={2}
              placeholder="Mention details such as preferred facing, construction timeline, loan requirement, etc."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E0D8]/60">
              <p className="text-xs text-gray-500">
                🔒 Your contact details remain 100% confidential. No spam or cold-callers.
              </p>
              <Button type="submit" isLoading={isLoading} size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                <span>Send My Requirement</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
