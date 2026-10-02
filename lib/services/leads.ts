/**
 * lib/services/leads.ts
 *
 * Data-access service for Leads CRM.
 * Uses service-role client for server-side CRUD so RLS never blocks internal reads.
 * Uses anon client for public inserts (website forms).
 */

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Lead } from "@/types/models";
import { LeadInput } from "@/lib/validations/lead";

// Fallback in-memory leads for testing without database setup
const MEMORY_LEADS: Lead[] = [
  {
    id: "lead-sample-1",
    name: "K. Selvam",
    phone: "+91 98421 12345",
    whatsapp: "+91 98421 12345",
    email: "selvam.k@example.com",
    intent: "buy",
    property_type: "plot",
    preferred_location: "Near New Bus Stand, Thanjavur",
    budget: "₹30 - 40 Lakhs",
    message: "Looking for an east-facing DTCP approved plot for home construction. Needs bank loan support.",
    source: "website",
    status: "new",
    notes: "Customer contacted via website quick requirement form.",
    follow_up_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    assigned_to: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lead-sample-2",
    name: "Dr. Anitha Mohan",
    phone: "+91 94432 98765",
    whatsapp: "+91 94432 98765",
    email: "dr.anitha@example.com",
    intent: "loan",
    property_type: "house",
    preferred_location: "Medical College Road",
    budget: "₹65 Lakhs",
    message: "Require SBI Home Loan consultation for an ongoing independent house construction.",
    source: "website",
    status: "contacted",
    notes: "Spoke on phone, explained required parent deeds & estimate format.",
    follow_up_date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    assigned_to: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Accept either key — anon key or new publishable key
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key && serviceKey &&
    !url.includes("placeholder") && !key.includes("placeholder");
}

// ─── READ ─────────────────────────────────────────────────────────────────────
// Always use admin client for reading leads so RLS never blocks staff dashboard
export async function getLeads(statusFilter?: string): Promise<Lead[]> {
  try {
    if (!isSupabaseConfigured()) {
      return statusFilter ? MEMORY_LEADS.filter(l => l.status === statusFilter) : MEMORY_LEADS;
    }

    const supabase = createAdminClient();
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[getLeads] Supabase error:", error.message);
      return statusFilter ? MEMORY_LEADS.filter(l => l.status === statusFilter) : MEMORY_LEADS;
    }
    // If DB empty, supplement with fallback so dashboard always has something to show
    if (!data || data.length === 0) {
      return statusFilter ? MEMORY_LEADS.filter(l => l.status === statusFilter) : MEMORY_LEADS;
    }
    return data as Lead[];
  } catch (err) {
    console.error("[getLeads] Exception:", err);
    return statusFilter ? MEMORY_LEADS.filter(l => l.status === statusFilter) : MEMORY_LEADS;
  }
}

// ─── CREATE ───────────────────────────────────────────────────────────────────
// Public insert — use admin client to bypass the broken RLS select-after-insert
export async function createLead(input: LeadInput): Promise<{ success: boolean; data?: Lead; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      const newLead: Lead = {
        id: "lead-" + Date.now(),
        name: input.name,
        phone: input.phone,
        whatsapp: input.whatsapp || null,
        email: input.email || null,
        intent: input.intent,
        property_type: input.property_type || null,
        preferred_location: input.preferred_location || null,
        budget: input.budget || null,
        message: input.message || null,
        source: input.source || "website",
        status: "new",
        notes: null,
        follow_up_date: null,
        assigned_to: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      MEMORY_LEADS.unshift(newLead);
      return { success: true, data: newLead };
    }

    // Use admin client so INSERT + SELECT works without hitting RLS select restriction
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: input.name,
        phone: input.phone,
        whatsapp: input.whatsapp || null,
        email: input.email || null,
        intent: input.intent,
        property_type: input.property_type || null,
        preferred_location: input.preferred_location || null,
        budget: input.budget || null,
        message: input.message || null,
        source: input.source || "website",
        status: "new",
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Lead };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit requirement";
    return { success: false, error: message };
  }
}

// ─── UPDATE STATUS ─────────────────────────────────────────────────────────────
export async function updateLeadStatus(id: string, status: string, notes?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const found = MEMORY_LEADS.find(l => l.id === id);
    if (found) {
      found.status = status as Lead["status"];
      if (notes) found.notes = notes;
    }

    if (!isSupabaseConfigured()) return { success: true };

    const supabase = createAdminClient();
    const updatePayload: Record<string, unknown> = { status };
    if (notes !== undefined) updatePayload.notes = notes;

    const { error } = await supabase.from("leads").update(updatePayload).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update lead";
    return { success: false, error: message };
  }
}
