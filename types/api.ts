/**
 * types/api.ts
 *
 * Shared API request and response types.
 * Used by both API routes and consuming client code.
 */

// ─── Generic API Response ────────────────────────────────────────────────────
export interface ApiSuccess<T = void> {
  success: true;
  data?: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  field?: string; // Which form field caused the error (for inline errors)
}

export type ApiResponse<T = void> = ApiSuccess<T> | ApiError;

// ─── Lead Submission ─────────────────────────────────────────────────────────
export interface LeadSubmissionRequest {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  intent: string;
  property_type?: string;
  preferred_location?: string;
  budget?: string;
  message?: string;
  source?: string;
}

// ─── Contact Form ────────────────────────────────────────────────────────────
export interface ContactFormRequest {
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
}

// ─── Like Request ────────────────────────────────────────────────────────────
export interface LikeRequest {
  post_id: string;
  visitor_id: string;
}

export interface LikeResponse {
  liked: boolean;
  likes_count: number;
}

// ─── Comment Request ─────────────────────────────────────────────────────────
export interface CommentRequest {
  post_id: string;
  name: string;
  message: string;
}

// ─── Upload Response ─────────────────────────────────────────────────────────
export interface UploadResponse {
  url: string;
  path: string;
}

// ─── Pagination ──────────────────────────────────────────────────────────────
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
