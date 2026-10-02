/**
 * lib/utils/format.ts
 *
 * Shared formatting utilities used across the application.
 */

/**
 * Format a number as Indian Rupee price.
 * e.g. 4500000 → "₹45 Lakhs"
 *      75000000 → "₹7.5 Crores"
 */
export function formatPrice(amount: number | null | undefined): string {
  if (!amount) return "Price on request";

  if (amount >= 10_000_000) {
    const crores = amount / 10_000_000;
    return `₹${crores % 1 === 0 ? crores : crores.toFixed(2)} Crores`;
  }

  if (amount >= 100_000) {
    const lakhs = amount / 100_000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(2)} Lakhs`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format area in sq.ft.
 * e.g. 2400 → "2,400 sq.ft"
 */
export function formatArea(sqft: number | null | undefined): string {
  if (!sqft) return "Area not specified";
  return `${new Intl.NumberFormat("en-IN").format(sqft)} sq.ft`;
}

/**
 * Format a date string to a human-readable format.
 * e.g. "2024-01-15T00:00:00Z" → "15 Jan 2024"
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a date to relative time.
 * e.g. "2 days ago", "just now"
 */
export function formatRelativeTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

/**
 * Truncate text to a maximum length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Format a phone number for display.
 */
export function formatPhone(phone: string): string {
  // Basic formatting for Indian numbers
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Build a WhatsApp deep link.
 */
export function buildWhatsAppLink(
  number: string,
  message?: string
): string {
  const cleaned = number.replace(/\D/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ""}`;
}
