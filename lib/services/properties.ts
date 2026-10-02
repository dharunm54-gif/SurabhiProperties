/**
 * lib/services/properties.ts
 *
 * Data-access service for Properties.
 * Contains fallback data when Supabase credentials are not yet configured,
 * ensuring the application is immediately testable and functional out of the box!
 */

import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/models";
import { PropertyInput } from "@/lib/validations/property";
import { slugify } from "@/lib/utils/slugify";

// In-memory properties array for local/fallback mode
const FALLBACK_PROPERTIES: Property[] = [
  {
    id: "p1-fallback-uuid",
    slug: "dtcp-approved-residential-plots-near-new-bus-stand",
    title: "DTCP Approved Residential Plots near New Bus Stand",
    property_type: "plot",
    location: "Raja Rajan Nagar, New Bus Stand Extension",
    city: "Thanjavur",
    area_sqft: 1800,
    price: 3200000,
    price_label: "₹32 Lakhs",
    description: "Premium DTCP approved east-facing residential plots in a fast-developing neighborhood. 30ft tar roads, clear underground drainage provision, street lights, and clear water table. Ready for immediate construction. Bank loan arranged up to 80%.",
    features: ["DTCP & RERA Approved", "East & North Facing Plots", "30 ft Wide Tar Road", "Clear Drinking Water Table", "Bank Loan Available up to 80%", "Immediate Patta Transfer"],
    status: "available",
    is_featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p2-fallback-uuid",
    slug: "3-bhk-independent-luxury-villa-pudukkottai-road",
    title: "3 BHK Independent Luxury Villa on Pudukkottai Road",
    property_type: "house",
    location: "Sundaram Nagar, Pudukkottai Road",
    city: "Thanjavur",
    area_sqft: 2400,
    price: 6800000,
    price_label: "₹68 Lakhs",
    description: "Architect-designed contemporary 3 BHK independent house with car parking, modular kitchen, and private terrace. 100% Vaastu compliant with premium teak wood carpentry and branded sanitary fittings.",
    features: ["Individual Borewell & Sump", "100% Vaastu Compliant", "Covered Car Parking", "Teak Wood Doors & Windows", "Modular Kitchen Fitted", "RERA Registered Builder"],
    status: "available",
    is_featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p3-fallback-uuid",
    slug: "prime-commercial-land-medical-college-road",
    title: "Prime Commercial Plot near Medical College Road",
    property_type: "commercial",
    location: "Medical College Road Main Junction",
    city: "Thanjavur",
    area_sqft: 3600,
    price: 12000000,
    price_label: "₹1.20 Crores",
    description: "High footfall commercial frontage plot suitable for clinics, corporate branch offices, educational centers, or retail showrooms. Outstanding connectivity to National Highway with 60ft frontage.",
    features: ["60 ft Main Road Frontage", "Commercial Zone Classification", "High Return on Investment", "Clear Parent Documents (40 Years)", "Suitable for Multi-Storey Construction"],
    status: "available",
    is_featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p4-fallback-uuid",
    slug: "fertile-agricultural-farmland-kallanai-belt",
    title: "Fertile Coconut Farmland near Grand Anicut (Kallanai) Belt",
    property_type: "agricultural",
    location: "Kallanai Canal Belt, Thiruvaiyaru Road",
    city: "Thanjavur",
    area_sqft: 43560,
    price: 4500000,
    price_label: "₹45 Lakhs",
    description: "1 Acre fertile agricultural soil with 70 mature yielding coconut trees, drip irrigation network, free agricultural electricity connection, and sweet water channel frontage. Dispute-free single ownership.",
    features: ["1 Acre Clear Land", "70 Yielding Coconut Trees", "Free Agri Power Connection", "All-Season Canal Irrigation", "Tractor Accessible Road"],
    status: "available",
    is_featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80",
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("placeholder") && !key.includes("placeholder");
}

export async function getProperties(filter?: {
  property_type?: string;
  status?: string;
  featured_only?: boolean;
}): Promise<Property[]> {
  try {
    if (!isSupabaseConfigured()) {
      return filterFallback(FALLBACK_PROPERTIES, filter);
    }

    const supabase = await createClient();
    let query = supabase
      .from("properties")
      .select("*, images:property_images(*)")
      .order("created_at", { ascending: false });

    if (filter?.property_type) {
      query = query.eq("property_type", filter.property_type);
    }
    if (filter?.status) {
      query = query.eq("status", filter.status);
    }
    if (filter?.featured_only) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return filterFallback(FALLBACK_PROPERTIES, filter);
    }
    return data as Property[];
  } catch (err) {
    console.error("[getProperties] Error:", err);
    return filterFallback(FALLBACK_PROPERTIES, filter);
  }
}

function filterFallback(list: Property[], filter?: { property_type?: string; status?: string; featured_only?: boolean }) {
  return list.filter((p) => {
    if (filter?.property_type && p.property_type !== filter.property_type) return false;
    if (filter?.status && p.status !== filter.status) return false;
    if (filter?.featured_only && !p.is_featured) return false;
    return true;
  });
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    if (!isSupabaseConfigured()) {
      return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*, images:property_images(*)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
    }
    return data as Property;
  } catch {
    return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
  }
}

export async function createProperty(input: PropertyInput, userId?: string): Promise<{ success: boolean; data?: Property; error?: string }> {
  try {
    const slug = slugify(input.title) + "-" + Math.random().toString(36).substring(2, 7);
    
    if (!isSupabaseConfigured()) {
      const newProperty: Property = {
        id: "prop-" + Date.now(),
        slug,
        title: input.title,
        property_type: input.property_type,
        location: input.location,
        city: input.city || "Thanjavur",
        area_sqft: input.area_sqft || null,
        price: input.price || null,
        price_label: input.price_label || null,
        description: input.description || null,
        features: input.features || [],
        status: input.status || "available",
        is_featured: Boolean(input.is_featured),
        cover_image_url: input.cover_image_url || null,
        created_by: userId || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      FALLBACK_PROPERTIES.unshift(newProperty);
      return { success: true, data: newProperty };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .insert({
        ...input,
        slug,
        created_by: userId || null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Property };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create property";
    return { success: false, error: message };
  }
}

export async function updateProperty(id: string, input: Partial<PropertyInput>): Promise<{ success: boolean; error?: string }> {
  try {
    const found = FALLBACK_PROPERTIES.find(p => p.id === id);
    if (found) {
      Object.assign(found, input, { updated_at: new Date().toISOString() });
    }

    if (!isSupabaseConfigured()) return { success: true };

    const supabase = await createClient();
    const { error } = await supabase.from("properties").update(input).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update property";
    return { success: false, error: message };
  }
}

export async function deleteProperty(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const index = FALLBACK_PROPERTIES.findIndex(p => p.id === id);
    if (index !== -1) {
      FALLBACK_PROPERTIES.splice(index, 1);
    }

    if (!isSupabaseConfigured()) return { success: true };

    const supabase = await createClient();
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete property";
    return { success: false, error: message };
  }
}
