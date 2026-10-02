import React from "react";
import { getServices } from "@/lib/services/content";
import { Plus } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Consultancy Services</h2>
          <p className="text-xs text-gray-500 mt-1">
            Edit service offerings and customer consultation descriptions.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#173F35] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs hover:bg-[#1F5447] transition-colors cursor-pointer">
          <Plus className="w-4 h-4 text-[#C7A45D]" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <h3 className="font-bold text-base text-[#173F35]">{srv.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{srv.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
