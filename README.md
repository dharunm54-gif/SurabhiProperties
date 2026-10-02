# Surabi Properties — Real Estate & Loan Consultancy Platform

A modern, production-ready, full-stack real estate and loan consultancy platform built for **Surabi Properties** based in Thanjavur, Tamil Nadu.

Designed around the conversion journey:
**Google Visitor → Trust → Requirement Submission → Lead CRM → Owner Consultation → Client Conversion**

---

## Key Highlights

- **100% Brand Tailored**: Built specifically for Surabi Properties with Deep Forest Green (`#173F35`), Muted Gold (`#C7A45D`), and Warm White (`#F8F7F3`).
- **Quick Requirement Capture**: Seamless homepage inquiry form feeding directly into the Owner Lead CRM.
- **Surabi Stories System**: Mini social-style updates for client milestones, loan sanctions, and local property insights with likes and moderated comments.
- **Dedicated Dashboards**:
  - `/owner/dashboard` — Lead CRM with statuses (New, Contacted, Follow-up, Meeting, Converted, Closed), property inventory, and story publisher.
  - `/admin/dashboard` — Master controls over staff accounts, testimonials, achievements, and service descriptions.
- **Out-of-the-Box Functionality**: Comes pre-configured with rich realistic fallback data, meaning all pages, filters, and forms work immediately even before Supabase credentials are wired.
- **Production-Ready SEO**: Dynamic metadata, OpenGraph tags, JSON-LD structured data, automatic `sitemap.xml`, and `robots.txt`.

---

## Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Project Structure

```text
surabi-properties/
├── app/
│   ├── (public)/                 # Public pages (Home, About, Services, Properties, Stories, Contact)
│   ├── owner/                    # Owner CRM, properties, stories, meetings, comments
│   ├── admin/                    # Master administrative management
│   ├── login/                    # Unified staff login
│   ├── api/                      # Validated REST API endpoints
│   ├── sitemap.ts                # Dynamic sitemap generator
│   └── robots.ts                 # Crawler directives
├── components/
│   ├── ui/                       # Base UI primitives (Button, Input, Select, Badge, Card...)
│   ├── layout/                   # Navbar, Footer, MobileActionBar
│   ├── sections/                 # Trust-building homepage sections
│   ├── properties/               # Property card & forms
│   └── stories/                  # Story card & social engagement buttons
├── lib/
│   ├── config/                   # Single source of truth (site.ts, navigation.ts, constants.ts)
│   ├── services/                 # Business logic & Supabase database queries
│   ├── validations/              # Zod validation schemas
│   └── supabase/                 # Client, Server, and Admin Supabase connectors
├── supabase/
│   └── migrations/               # PostgreSQL schema, RLS policies, indexes, and seed SQL
└── docs/                         # Comprehensive architectural and customization manuals
```

---

## Customizing Business Information

All business details, phone numbers, addresses, and founder information can be updated in one single file:
👉 **`lib/config/site.ts`**

Any change made there automatically updates the navbar, footer, contact page, hero section, and metadata across the entire website.
