/**
 * lib/services/stories.ts
 *
 * Data-access service for Surabi Stories social feed.
 */

import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types/models";
import { StoryInput } from "@/lib/validations/story";
import { slugify } from "@/lib/utils/slugify";

const FALLBACK_STORIES: Post[] = [
  {
    id: "s1-fallback",
    slug: "45-lakhs-sbi-home-loan-sanctioned-in-7-working-days",
    title: "Seamless SBI Home Loan Sanction for Dr. K. Ramanathan in 7 Days",
    description: "Dr. Ramanathan, a medical practitioner working in Thanjavur Medical College, approached us after facing confusion regarding agricultural land conversion and legal vet requirements for his dream home construction. Our dedicated banking consultancy team streamlined the parent title verification, revenue approvals, and secured an SBI MaxGain sanction in record time.",
    category: "client_success",
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    status: "published",
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    created_by: null,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    likes_count: 42,
    comments_count: 5,
  },
  {
    id: "s2-fallback",
    slug: "surabi-properties-surpasses-15-years-of-ethical-consultancy",
    title: "Celebrating 15 Years of Serving Thanjavur Property Seekers",
    description: "15 years ago, Surabi Properties was founded on a simple promise: No misleading claims, no hidden commissions, and 100% honest paperwork. Today, with over 600+ families having consulted with us, we reiterate our commitment to safeguarding your hard-earned savings during property transactions.",
    category: "achievement",
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    status: "published",
    published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    created_by: null,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    likes_count: 88,
    comments_count: 12,
  },
  {
    id: "s3-fallback",
    slug: "thanjavur-smart-city-road-widening-property-impact",
    title: "Thanjavur Ring Road & Master Plan Expansion: Insights for Land Buyers",
    description: "With the progression of the Thanjavur Outer Ring Road and bypass expansion, specific pockets around Pudukkottai Road, Trichy Road, and Vallam are seeing accelerated infrastructure growth. Here is our grounded perspective on what to check before investing in these corridors.",
    category: "property_update",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    status: "published",
    published_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    created_by: null,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    likes_count: 29,
    comments_count: 3,
  }
];

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("placeholder") && !key.includes("placeholder");
}

export async function getStories(limit?: number): Promise<Post[]> {
  try {
    if (!isSupabaseConfigured()) {
      return limit ? FALLBACK_STORIES.slice(0, limit) : FALLBACK_STORIES;
    }

    const supabase = await createClient();
    let query = supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return limit ? FALLBACK_STORIES.slice(0, limit) : FALLBACK_STORIES;
    }
    return data as Post[];
  } catch {
    return limit ? FALLBACK_STORIES.slice(0, limit) : FALLBACK_STORIES;
  }
}

export async function getStoryBySlug(slug: string): Promise<Post | null> {
  try {
    if (!isSupabaseConfigured()) {
      return FALLBACK_STORIES.find((s) => s.slug === slug) || null;
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
    if (error || !data) {
      return FALLBACK_STORIES.find((s) => s.slug === slug) || null;
    }
    return data as Post;
  } catch {
    return FALLBACK_STORIES.find((s) => s.slug === slug) || null;
  }
}

export async function createStory(input: StoryInput, userId?: string): Promise<{ success: boolean; data?: Post; error?: string }> {
  try {
    const slug = slugify(input.title) + "-" + Math.random().toString(36).substring(2, 7);
    
    if (!isSupabaseConfigured()) {
      const newPost: Post = {
        id: "story-" + Date.now(),
        slug,
        title: input.title,
        description: input.description,
        category: input.category,
        image_url: input.image_url || null,
        status: input.status || "published",
        published_at: new Date().toISOString(),
        created_by: userId || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
      };
      FALLBACK_STORIES.unshift(newPost);
      return { success: true, data: newPost };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...input,
        slug,
        published_at: input.status === "published" ? new Date().toISOString() : null,
        created_by: userId || null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Post };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create story";
    return { success: false, error: message };
  }
}
