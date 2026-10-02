# Architecture Overview — Surabi Properties

## 1. High-Level Concept

Surabi Properties is built around a single conversion funnel:
```
Google / Search / Social Visitor
  ↓
Trust Building (Verified listings, founder pedigree, parent deed guarantees)
  ↓
Requirement Submission (Homepage Quick Requirement form)
  ↓
Lead in Owner CRM
  ↓
Owner Calls Client / Schedules Office Consultation
  ↓
Client Conversion & Legal Handover
```

## 2. Technology Stack

- **Framework**: Next.js 16+ (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with custom brand tokens
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Auth**: Supabase Auth (Cookie-based SSR session management)
- **Storage**: Supabase Storage
- **Validation**: Zod (Shared schemas between client and API routes)
- **Icons**: Lucide React
