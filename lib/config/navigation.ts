/**
 * lib/config/navigation.ts
 *
 * All navigation links are defined here.
 * Change menu structure in one place — it updates everywhere.
 */

export const publicNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Surabi Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
] as const;

export const ownerNav = [
  { label: "Dashboard", href: "/owner/dashboard", icon: "LayoutDashboard" },
  { label: "Leads", href: "/owner/leads", icon: "Users" },
  { label: "Properties", href: "/owner/properties", icon: "Building2" },
  { label: "Stories", href: "/owner/stories", icon: "Newspaper" },
  { label: "Comments", href: "/owner/comments", icon: "MessageSquare" },
  { label: "Meetings", href: "/owner/meetings", icon: "CalendarDays" },
  { label: "Settings", href: "/owner/settings", icon: "Settings" },
] as const;

export const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Users", href: "/admin/users", icon: "UserCog" },
  { label: "Leads", href: "/admin/leads", icon: "Users" },
  { label: "Properties", href: "/admin/properties", icon: "Building2" },
  { label: "Stories", href: "/admin/stories", icon: "Newspaper" },
  { label: "Comments", href: "/admin/comments", icon: "MessageSquare" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "Achievements", href: "/admin/achievements", icon: "Trophy" },
  { label: "Services", href: "/admin/services", icon: "Briefcase" },
  { label: "Content", href: "/admin/content", icon: "FileText" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Featured Properties", href: "/properties" },
    { label: "Surabi Stories", href: "/stories" },
    { label: "Contact Office", href: "/contact" },
  ],
  services: [
    { label: "Property Buying & Selling", href: "/services" },
    { label: "Bank Loan Consultancy", href: "/services" },
    { label: "Plot & Layout Guidance", href: "/services" },
    { label: "Property Legal Verification", href: "/services" },
    { label: "Asset Management", href: "/services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
