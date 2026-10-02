import React from "react";
import Link from "next/link";
import { getLeads } from "@/lib/services/leads";
import { getProperties } from "@/lib/services/properties";
import { getStories } from "@/lib/services/stories";
import { Users, Building2, Newspaper, ArrowRight, Clock, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";

export default async function OwnerDashboardPage() {
  const [leads, properties, stories] = await Promise.all([
    getLeads(),
    getProperties(),
    getStories(),
  ]);

  const newLeads = leads.filter((l) => l.status === "new");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#173F35] text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C7A45D] font-bold">
            Overview Console
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Good day, Mr Shenthil Kumar !
          </h2>
          <p className="text-sm text-gray-200 mt-1">
            You have <strong className="text-[#C7A45D]">{newLeads.length} new client inquiries</strong> awaiting your personal follow-up today.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/owner/properties/new"
            className="inline-flex items-center gap-1.5 bg-[#C7A45D] hover:bg-[#D4B87A] text-[#173F35] font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>

          <Link
            href="/owner/stories/new"
            className="inline-flex items-center gap-1.5 bg-[#1F5447] hover:bg-[#1F5447]/80 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border border-white/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Story</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase">New Leads</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#173F35] mt-2">{newLeads.length}</p>
          <span className="text-xs text-gray-400 mt-1 block">Awaiting call</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase">Total Leads</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#173F35] mt-2">{leads.length}</p>
          <span className="text-xs text-gray-400 mt-1 block">All registered inquiries</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase">Active Properties</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#173F35] mt-2">{properties.length}</p>
          <span className="text-xs text-gray-400 mt-1 block">Listed on website</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase">Surabi Stories</span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#173F35] mt-2">{stories.length}</p>
          <span className="text-xs text-gray-400 mt-1 block">Published milestones</span>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#173F35]">Recent Client Requirements</h3>
            <p className="text-xs text-gray-500">Submitted directly via website requirement forms</p>
          </div>
          <Link
            href="/owner/leads"
            className="text-xs font-bold text-[#173F35] hover:text-[#C7A45D] flex items-center gap-1"
          >
            <span>Manage All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#242424]">{lead.name}</span>
                  <Badge variant={lead.status === "new" ? "green" : "gray"}>
                    {lead.status}
                  </Badge>
                  <span className="text-xs font-semibold text-[#C7A45D] uppercase">
                    Looking to {lead.intent}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Phone: <strong>{lead.phone}</strong> • Location: {lead.preferred_location || "Not specified"} • Budget: {lead.budget || "Flexible"}
                </p>

                {lead.message && (
                  <p className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded max-w-xl">
                    &ldquo;{lead.message}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex sm:flex-col items-end justify-between text-right gap-2 shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(lead.created_at)}</span>
                </div>
                <Link
                  href={`/owner/leads/${lead.id}`}
                  className="bg-[#173F35] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#1F5447] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
