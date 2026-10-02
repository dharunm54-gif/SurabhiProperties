/**
 * lib/config/site.ts
 *
 * SINGLE SOURCE OF TRUTH for all Surabi Properties business information.
 * Change business details here — they propagate everywhere automatically.
 */

export const siteConfig = {
  // Business Identity
  name: "Surabi Properties",
  tagline: "Find the right property. Make the right move.",
  description:
    "Surabi Properties is a trusted real estate and loan consultancy based in Thanjavur. We assist with property buying, selling, plot consultation, bank loan guidance, and property management.",
  shortDescription:
    "Trusted real estate and loan consultancy in Thanjavur, Tamil Nadu.",

  // Contact
  phone: "+91 9894331557",
  phoneRaw: "+91 9894331557",
  whatsapp: "9894331557",
  email: "contact.surabiproperties@gmail.com",

  // Location
  address: {
    street: "No. 14, Gandhiji Road, Near Old Bus Stand",
    city: "Thanjavur",
    state: "Tamil Nadu",
    pincode: "613001",
    country: "India",
    full: "No. 14, Gandhiji Road, Near Old Bus Stand, Thanjavur, Tamil Nadu - 613001",
  },

  // Maps
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125434.3414981755!2d79.05608826760655!3d10.78283626359052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab89d690a424b%3A0x675bdbe12d09bb20!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  mapsDirectionsUrl: "https://maps.google.com/?q=Surabi+Properties+Thanjavur",

  // Business Hours
  workingHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 7:00 PM",
    sunday: "Sunday: By Appointment Only",
    display: [
      { days: "Monday – Saturday", hours: "9:00 AM – 7:00 PM" },
      { days: "Sunday", hours: "By Appointment Only" },
    ],
  },

  // Social & Review Links
  social: {
    google: "https://maps.google.com/?q=Surabi+Properties+Thanjavur",
    instagram: "https://instagram.com/surabiproperties",
    facebook: "https://facebook.com/surabiproperties",
    youtube: "https://youtube.com/@surabiproperties",
  },

  // URLs
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://surabiproperties.in",

  // SEO
  seo: {
    title: "Surabi Properties | Real Estate & Loan Consultancy in Thanjavur",
    description:
      "Surabi Properties helps you buy, sell, and manage property in Thanjavur. Expert loan consultancy and transparent property guidance. Talk to a consultant today.",
    keywords: [
      "Surabi Properties",
      "property consultant Thanjavur",
      "real estate Thanjavur",
      "plot for sale Thanjavur",
      "property buying Thanjavur",
      "home loan consultancy Thanjavur",
      "bank loan property Tamil Nadu",
      "property management Thanjavur",
      "property consultancy Tamil Nadu",
    ],
    ogImage: "/images/og-image.jpg",
  },

  // Consultant Profile
  consultant: {
    name: "Shenthil Kumar",
    title: "Senior Property & Loan Consultant",
    experience: "15+ Years of Industry Experience",
    bio: "With deep roots and over 15 years in Thanjavur's real estate ecosystem, Mr Shenthil Kumar has facilitated over 450+ successful property deals and bank loan sanctions. His ethos is built strictly upon legal transparency, unhurried personal counsel, and genuine client welfare.",
    photo: "/images/Sep 11.jpg",
    phone: "+91 9894331557",
    whatsapp: "+91 9894331557",
  },
} as const;

export type SiteConfig = typeof siteConfig;
