import React from "react";
import Link from "next/link";
import { getProperties } from "@/lib/services/properties";
import { Plus, Edit2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function OwnerPropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Property Listings</h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage your verified plots, houses, and commercial property listings.
          </p>
        </div>

        <Link
          href="/owner/properties/new"
          className="inline-flex items-center gap-2 bg-[#173F35] text-white hover:bg-[#1F5447] text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C7A45D]" />
          <span>Add New Property</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="py-3 px-6">Property Title</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#173F35]">
                    {prop.title}
                    {prop.is_featured && (
                      <span className="ml-2 inline-block text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 uppercase text-xs font-medium text-gray-600">
                    {prop.property_type}
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-xs">
                    {prop.location}
                  </td>
                  <td className="py-4 px-6 font-bold text-[#173F35]">
                    {prop.price_label || "Negotiable"}
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={prop.status === "available" ? "green" : "gray"}>
                      {prop.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href={`/property/${prop.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#173F35]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/owner/properties/${prop.id}/edit`}
                      className="inline-flex items-center gap-1 text-xs text-[#173F35] font-semibold hover:underline"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
