import React from "react";
import { getLeads } from "@/lib/services/leads";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export default async function OwnerLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const leads = await getLeads(status);

  const filterTabs = [
    { label: "All Leads", value: "" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Follow-up", value: "follow_up" },
    { label: "Meeting", value: "meeting" },
    { label: "Converted", value: "converted" },
    { label: "Closed", value: "closed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">Client Requirement Leads</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review, call back, and record consultation notes for each client submission.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {filterTabs.map((tab) => {
          const isSelected = (!status && tab.value === "") || status === tab.value;
          return (
            <Link
              key={tab.value}
              href={tab.value ? `/owner/leads?status=${tab.value}` : "/owner/leads"}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#173F35] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No leads found in this category.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-base text-[#173F35]">{lead.name}</span>
                    <Badge variant={lead.status === "new" ? "green" : "gray"}>
                      {lead.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-wider">
                      Intent: {lead.intent}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600">
                    <p>
                      <strong>Phone:</strong> {lead.phone}
                    </p>
                    <p>
                      <strong>Location:</strong> {lead.preferred_location || "Not specified"}
                    </p>
                    <p>
                      <strong>Budget:</strong> {lead.budget || "Not specified"}
                    </p>
                  </div>

                  {lead.message && (
                    <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-700 leading-relaxed border border-gray-100">
                      <strong>Client Note:</strong> &ldquo;{lead.message}&rdquo;
                    </div>
                  )}

                  {lead.notes && (
                    <div className="bg-amber-50/60 p-2.5 rounded-md text-xs text-amber-900 border border-amber-200/50">
                      <strong>Consultant Note:</strong> {lead.notes}
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center justify-center gap-1.5 bg-[#173F35] text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#1F5447] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C7A45D]" />
                    <span>Call</span>
                  </a>

                  {lead.whatsapp && (
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#22bf5b] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  <Link
                    href={`/owner/leads/${lead.id}`}
                    className="flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Details &amp; Status
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
