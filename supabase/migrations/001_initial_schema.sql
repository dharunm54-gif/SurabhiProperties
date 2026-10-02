-- ============================================================
-- Migration: 001_initial_schema.sql
-- Surabi Properties — Initial Database Schema
--
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- or via the Supabase CLI: supabase db push
--
-- Tables created:
--   users, properties, property_images, leads, meetings,
--   posts, post_likes, comments, testimonials, achievements,
--   services, contact_messages, site_settings
-- ============================================================

-- Enable UUID extension (should already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── USERS ─────────────────────────────────────────────────────────────────
-- Mirrors auth.users — stores application-level role and profile.
-- Automatically populated via trigger when a new auth user is created.
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  role        TEXT NOT NULL CHECK (role IN ('owner', 'admin')),
  avatar_url  TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger to sync auth.users → public.users on new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'owner')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─── PROPERTIES ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.properties (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  property_type   TEXT NOT NULL CHECK (property_type IN ('plot','apartment','house','commercial','agricultural','other')),
  location        TEXT NOT NULL,
  city            TEXT NOT NULL DEFAULT 'Thanjavur',
  area_sqft       NUMERIC,
  price           NUMERIC,
  price_label     TEXT,
  description     TEXT,
  features        TEXT[] NOT NULL DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','reserved','sold','inactive')),
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  created_by      UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── PROPERTY IMAGES ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.property_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  alt_text     TEXT,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── LEADS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  phone               TEXT NOT NULL,
  whatsapp            TEXT,
  email               TEXT,
  intent              TEXT NOT NULL CHECK (intent IN ('buy','sell','loan','consultation','management')),
  property_type       TEXT CHECK (property_type IN ('plot','apartment','house','commercial','agricultural','other')),
  preferred_location  TEXT,
  budget              TEXT,
  message             TEXT,
  source              TEXT NOT NULL DEFAULT 'website',
  status              TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','follow_up','meeting','converted','closed')),
  notes               TEXT,
  follow_up_date      DATE,
  assigned_to         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── MEETINGS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.meetings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id       UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_name   TEXT NOT NULL,
  client_phone  TEXT NOT NULL,
  meeting_date  TIMESTAMPTZ,
  location      TEXT,
  notes         TEXT,
  status        TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','rescheduled')),
  created_by    UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── POSTS (Surabi Stories) ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  category     TEXT NOT NULL CHECK (category IN ('achievement','client_success','property_update','business_update','event','client_appreciation')),
  image_url    TEXT,
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at TIMESTAMPTZ,
  created_by   UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── POST LIKES ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.post_likes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  visitor_id  TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, visitor_id)
);

-- ─── COMMENTS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','deleted')),
  reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── TESTIMONIALS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  location    TEXT,
  content     TEXT NOT NULL,
  rating      INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url  TEXT,
  source      TEXT NOT NULL DEFAULT 'manual',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── ACHIEVEMENTS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  value       TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── SERVICES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true
);

-- ─── CONTACT MESSAGES ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── SITE SETTINGS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL DEFAULT '',
  description TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('business_name',   'Surabi Properties',                  'Business display name'),
  ('phone',           '+91-XXXXX-XXXXX',                    'Primary phone number'),
  ('whatsapp',        '91XXXXXXXXXX',                       'WhatsApp number (no + prefix)'),
  ('email',           'contact@surabiproperties.in',        'Contact email address'),
  ('address',         'Your Address, Thanjavur, Tamil Nadu','Full office address'),
  ('google_review_url', '',                                 'Google Business review link'),
  ('maps_embed_url',  '',                                   'Google Maps embed URL')
ON CONFLICT (key) DO NOTHING;

-- ─── updated_at Trigger Function ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['properties','leads','meetings','posts','site_settings']
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON public.%I;
       CREATE TRIGGER set_updated_at
         BEFORE UPDATE ON public.%I
         FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();',
      t, t
    );
  END LOOP;
END $$;
