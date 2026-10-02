/**
 * types/models.ts
 *
 * Application-level domain types.
 * These mirror the database schema but are shaped for frontend use.
 * Keep in sync with supabase/migrations/ when schema changes.
 */

// ─── User ────────────────────────────────────────────────────────────────────
export type UserRole = "owner" | "admin";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Property ────────────────────────────────────────────────────────────────
export type PropertyStatus = "available" | "reserved" | "sold" | "inactive";
export type PropertyType =
  | "plot"
  | "apartment"
  | "house"
  | "commercial"
  | "agricultural"
  | "other";

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  property_type: PropertyType;
  location: string;
  city: string;
  area_sqft: number | null;
  price: number | null;
  price_label: string | null;
  description: string | null;
  features: string[];
  status: PropertyStatus;
  is_featured: boolean;
  cover_image_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  images?: PropertyImage[];
}

// ─── Lead ────────────────────────────────────────────────────────────────────
export type LeadStatus =
  | "new"
  | "contacted"
  | "follow_up"
  | "meeting"
  | "converted"
  | "closed";

export type LeadIntent =
  | "buy"
  | "sell"
  | "loan"
  | "consultation"
  | "management";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  intent: LeadIntent;
  property_type: PropertyType | null;
  preferred_location: string | null;
  budget: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  notes: string | null;
  follow_up_date: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Meeting ─────────────────────────────────────────────────────────────────
export type MeetingStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface Meeting {
  id: string;
  lead_id: string | null;
  client_name: string;
  client_phone: string;
  meeting_date: string | null;
  location: string | null;
  notes: string | null;
  status: MeetingStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Post (Surabi Stories) ───────────────────────────────────────────────────
export type PostStatus = "draft" | "published";
export type StoryCategory =
  | "achievement"
  | "client_success"
  | "property_update"
  | "business_update"
  | "event"
  | "client_appreciation";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: StoryCategory;
  image_url: string | null;
  status: PostStatus;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Computed / joined
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

// ─── Comment ─────────────────────────────────────────────────────────────────
export type CommentStatus = "pending" | "approved" | "deleted";

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  message: string;
  status: CommentStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

// ─── PostLike ────────────────────────────────────────────────────────────────
export interface PostLike {
  id: string;
  post_id: string;
  visitor_id: string;
  created_at: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  source: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// ─── Achievement ─────────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  value: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

// ─── Contact Message ─────────────────────────────────────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ─── Site Settings ───────────────────────────────────────────────────────────
export interface SiteSetting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}
