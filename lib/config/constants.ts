/**
 * lib/config/constants.ts
 *
 * App-wide constants.
 * Values that are used across multiple modules but don't belong in site config.
 */

// ─── Lead Statuses ─────────────────────────────────────────────────────────
export const LEAD_STATUSES = [
  { value: "new", label: "New", color: "blue" },
  { value: "contacted", label: "Contacted", color: "yellow" },
  { value: "follow_up", label: "Follow-up", color: "orange" },
  { value: "meeting", label: "Meeting", color: "purple" },
  { value: "converted", label: "Converted", color: "green" },
  { value: "closed", label: "Closed", color: "gray" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

// ─── Property Types ─────────────────────────────────────────────────────────
export const PROPERTY_TYPES = [
  { value: "plot", label: "Plot / Land" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "house", label: "Independent House / Villa" },
  { value: "commercial", label: "Commercial Space" },
  { value: "agricultural", label: "Agricultural Land" },
  { value: "other", label: "Other" },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]["value"];

// ─── Property Statuses ──────────────────────────────────────────────────────
export const PROPERTY_STATUSES = [
  { value: "available", label: "Available", color: "green" },
  { value: "reserved", label: "Reserved", color: "yellow" },
  { value: "sold", label: "Sold", color: "red" },
  { value: "inactive", label: "Inactive", color: "gray" },
] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number]["value"];

// ─── Story Categories ───────────────────────────────────────────────────────
export const STORY_CATEGORIES = [
  { value: "achievement", label: "Achievement", emoji: "🏆" },
  { value: "client_success", label: "Client Success", emoji: "🎉" },
  { value: "property_update", label: "Property Update", emoji: "🏠" },
  { value: "business_update", label: "Business Update", emoji: "📢" },
  { value: "event", label: "Event", emoji: "📅" },
  { value: "client_appreciation", label: "Client Appreciation", emoji: "❤️" },
] as const;

export type StoryCategory = (typeof STORY_CATEGORIES)[number]["value"];

// ─── Intent Types ───────────────────────────────────────────────────────────
export const INTENT_OPTIONS = [
  { value: "buy", label: "Buy a Property" },
  { value: "sell", label: "Sell a Property" },
  { value: "loan", label: "Loan Consultancy" },
  { value: "consultation", label: "Property Consultation" },
  { value: "management", label: "Property Management" },
] as const;

export type IntentType = (typeof INTENT_OPTIONS)[number]["value"];

// ─── Comment Statuses ───────────────────────────────────────────────────────
export const COMMENT_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "deleted", label: "Deleted" },
] as const;

// ─── Meeting Statuses ───────────────────────────────────────────────────────
export const MEETING_STATUSES = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rescheduled", label: "Rescheduled" },
] as const;

// ─── User Roles ─────────────────────────────────────────────────────────────
export const USER_ROLES = [
  { value: "owner", label: "Owner / Consultant" },
  { value: "admin", label: "System Admin" },
] as const;

export type UserRole = (typeof USER_ROLES)[number]["value"];

// ─── Pagination ─────────────────────────────────────────────────────────────
export const PAGE_SIZE = {
  properties: 12,
  stories: 9,
  leads: 20,
  comments: 20,
  users: 20,
} as const;

// ─── File Upload Limits ─────────────────────────────────────────────────────
export const UPLOAD = {
  maxSizeMB: 5,
  maxSizeBytes: 5 * 1024 * 1024,
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedImageExtensions: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

// ─── Visitor ID ─────────────────────────────────────────────────────────────
export const VISITOR_ID_KEY = "surabi_visitor_id";
