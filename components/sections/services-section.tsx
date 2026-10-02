import React from "react";
import Link from "next/link";
import { Service } from "@/types/models";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Landmark,
  Compass,
  ShieldCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8 text-[#C7A45D]" />,
  Landmark: <Landmark className="w-8 h-8 text-[#C7A45D]" />,
  Compass: <Compass className="w-8 h-8 text-[#C7A45D]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#C7A45D]" />,
  Briefcase: <Briefcase className="w-8 h-8 text-[#C7A45D]" />,
};

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Comprehensive Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173F35] mt-2">
            Professional Real Estate &amp; Loan Services
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Every property transaction involves significant financial and legal commitments.
            We eliminate confusion and safeguard your interests from consultation to registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <Card
              key={srv.id}
              className="hover:border-[#C7A45D]/60 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#173F35]/5 border border-[#173F35]/10 flex items-center justify-center group-hover:bg-[#173F35] transition-colors">
                  {srv.icon && iconMap[srv.icon] ? (
                    <div className="group-hover:text-[#C7A45D]">
                      {iconMap[srv.icon]}
                    </div>
                  ) : (
                    <Building2 className="w-8 h-8 text-[#C7A45D]" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#173F35] group-hover:text-[#1F5447] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {srv.description}
                </p>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#173F35] hover:text-[#C7A45D] transition-colors gap-1"
                  >
                    <span>Enquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
