import React from "react";
import { Shield, FileCheck2, UserCheck, Banknote, Handshake, Landmark } from "lucide-react";

const trustPoints = [
  {
    icon: <FileCheck2 className="w-7 h-7 text-[#C7A45D]" />,
    title: "100% Parent Title Scrutiny",
    description: "We personally verify 30-40 years of parent documents, encumbrance certificates (EC), and patta before introducing any property to you.",
  },
  {
    icon: <Banknote className="w-7 h-7 text-[#C7A45D]" />,
    title: "Zero Hidden Charges",
    description: "Direct transparency in consultancy charges and clear pricing. No inflated rates or misleading commitments.",
  },
  {
    icon: <Landmark className="w-7 h-7 text-[#C7A45D]" />,
    title: "Nationalized Bank Loan Support",
    description: "Complete assistance with SBI, Canara, HDFC, and other banks with minimal hassle and direct branch coordination.",
  },
  {
    icon: <UserCheck className="w-7 h-7 text-[#C7A45D]" />,
    title: "Personal Sub-Registrar Support",
    description: "Our senior consultant accompanies you to the Sub-Registrar office to ensure smooth, legal, and verified execution.",
  },
  {
    icon: <Shield className="w-7 h-7 text-[#C7A45D]" />,
    title: "DTCP & RERA Vetting",
    description: "We guide you away from unapproved layouts and unauthorized subdivisions to protect your lifetime capital.",
  },
  {
    icon: <Handshake className="w-7 h-7 text-[#C7A45D]" />,
    title: "Lifelong Relationship",
    description: "Our engagement does not end at sale deeds. We help with mutation of patta, electricity connection, and site upkeep.",
  },
];

export function WhySurabi() {
  return (
    <section className="py-20 bg-[#F8F7F3] border-y border-[#E2E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Uncompromising Ethics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
            Why Surabi Properties is Trusted Across Thanjavur
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Real estate is not just land; it is hard-earned family savings. Here is our unwavering pledge to every client who walks through our doors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl border border-[#E2E0D8] shadow-xs hover:border-[#C7A45D] transition-colors space-y-3"
            >
              <div className="w-12 h-12 rounded-lg bg-[#173F35]/5 flex items-center justify-center mb-4">
                {pt.icon}
              </div>
              <h3 className="text-lg font-bold text-[#173F35]">{pt.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
