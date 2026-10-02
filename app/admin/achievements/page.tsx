import React from "react";
import { getAchievements } from "@/lib/services/content";
import { Plus } from "lucide-react";

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#173F35]">Achievements &amp; Milestones</h2>
          <p className="text-xs text-gray-500 mt-1">
            Display business track records and transacted figures on public pages.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#173F35] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs hover:bg-[#1F5447] transition-colors cursor-pointer">
          <Plus className="w-4 h-4 text-[#C7A45D]" />
          <span>New Milestone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <p className="text-2xl font-extrabold text-[#C7A45D]">{ach.value}</p>
            <h3 className="font-bold text-sm text-[#173F35]">{ach.title}</h3>
            <p className="text-xs text-gray-500">{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
