/**
 * lib/services/content.ts
 *
 * Data access service for Services, Achievements, and Testimonials.
 */

import { createClient } from "@/lib/supabase/server";
import { Service, Achievement, Testimonial } from "@/types/models";

const FALLBACK_SERVICES: Service[] = [
  {
    id: "srv-1",
    title: "Property Buying & Selling",
    description: "Complete end-to-end guidance in identifying clear-title residential plots, agricultural lands, and independent houses across Thanjavur.",
    icon: "Building2",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "srv-2",
    title: "Bank Loan Consultancy",
    description: "Expert loan assistance with leading public & private sector banks (SBI, Canara, HDFC, ICICI). Document vetting, subsidy guidance, and swift approval support.",
    icon: "Landmark",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "srv-3",
    title: "Plot & Layout Consultation",
    description: "DTCP & RERA approved plot advisory, verification of survey numbers, encumbrance certificates (EC), and patta transfer procedures.",
    icon: "Compass",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "srv-4",
    title: "Property Legal Verification",
    description: "Pre-purchase legal scrutiny by experienced property advocates to ensure 100% dispute-free ownership before you commit funds.",
    icon: "ShieldCheck",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "srv-5",
    title: "Property Asset Management",
    description: "Periodic boundary monitoring, fence maintenance, rental tenancy assistance, and tax clearance for non-resident property owners.",
    icon: "Briefcase",
    sort_order: 5,
    is_active: true,
  }
];

const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Properties Transacted",
    description: "Assisted families & investors in acquiring verified properties.",
    icon: "Home",
    value: "450+",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ach-2",
    title: "Bank Loans Sanctioned",
    description: "Assisted seamless loan processing with nationalized banks.",
    icon: "BadgeCheck",
    value: "₹35+ Cr",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ach-3",
    title: "Years of Trust",
    description: "Continuous trusted presence in Thanjavur property consultancy.",
    icon: "Award",
    value: "15+ Years",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ach-4",
    title: "Satisfied Clients",
    description: "Direct personal relationships built upon genuine client welfare.",
    icon: "Users",
    value: "600+",
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  }
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "R. Kalyanasundaram",
    location: "Retired Bank Manager, Thanjavur",
    content: "Surabi Properties helped me identify an authentic DTCP plot for my daughter. What impressed me wasr. Shenthil Kumar their absolute insistence on verifying 35-year parent deeds. M is truly an advisor you can trust blindly.",
    rating: 5,
    avatar_url: null,
    source: "google",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "test-2",
    name: "Dr. S. Preethi & S. Vignesh",
    location: "Medical College Road, Thanjavur",
    content: "We had zero knowledge about building permission rules and bank loans. Surabi team managed both our villa purchase and HDFC loan sanction without a single hassle. Highly recommended for busy professionals!",
    rating: 5,
    avatar_url: null,
    source: "manual",
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "test-3",
    name: "M. Chelladurai",
    location: "Farmer & Business Owner, Thiruvaiyaru",
    content: "Direct dealing, transparent commission, and personal accompaniment to the Sub-Registrar office. In a field full of brokers who make empty promises, Surabi Properties stands tall as true professionals.",
    rating: 5,
    avatar_url: null,
    source: "google",
    is_featured: true,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  }
];

export async function getServices(): Promise<Service[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_SERVICES;
    const supabase = await createClient();
    const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("sort_order");
    if (error || !data || data.length === 0) return FALLBACK_SERVICES;
    return data as Service[];
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_ACHIEVEMENTS;
    const supabase = await createClient();
    const { data, error } = await supabase.from("achievements").select("*").eq("is_active", true).order("sort_order");
    if (error || !data || data.length === 0) return FALLBACK_ACHIEVEMENTS;
    return data as Achievement[];
  } catch {
    return FALLBACK_ACHIEVEMENTS;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_TESTIMONIALS;
    const supabase = await createClient();
    const { data, error } = await supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order");
    if (error || !data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
