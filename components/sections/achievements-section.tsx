import React from "react";
import { Achievement } from "@/types/models";
import { Home, BadgeCheck, Award, Users } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-8 h-8 text-[#C7A45D]" />,
  BadgeCheck: <BadgeCheck className="w-8 h-8 text-[#C7A45D]" />,
  Award: <Award className="w-8 h-8 text-[#C7A45D]" />,
  Users: <Users className="w-8 h-8 text-[#C7A45D]" />,
};

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="py-16 bg-[#173F35] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((ach) => (
            <div key={ach.id} className="text-center space-y-2 p-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1F5447] flex items-center justify-center mb-3">
                {ach.icon && iconMap[ach.icon] ? (
                  iconMap[ach.icon]
                ) : (
                  <Award className="w-8 h-8 text-[#C7A45D]" />
                )}
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C7A45D]">
                {ach.value}
              </p>
              <h3 className="text-base font-bold text-white">{ach.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-[200px] mx-auto">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
