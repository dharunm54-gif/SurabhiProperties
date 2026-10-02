"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES } from "@/lib/config/constants";
import { ArrowLeft, Save, Check } from "lucide-react";
import Link from "next/link";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("contacted");
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      router.push("/owner/leads");
    }, 1200);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/owner/leads"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C7A45D]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Leads</span>
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#C7A45D] font-bold">
            Lead ID: {params?.id as string}
          </span>
          <h2 className="text-2xl font-bold text-[#173F35] mt-1">
            Update Lead Status &amp; Consultation Notes
          </h2>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Lead status updated successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <Select
            label="Lead Status:"
            options={LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <Textarea
            label="Consultant Notes / Outcome of Call:"
            rows={4}
            placeholder="Record details of conversation, budget discussed, office visit timing, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit" size="md">
              <Save className="w-4 h-4 mr-2" />
              <span>Save Lead Updates</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
