-- ============================================================
-- Migration: 002_rls_policies.sql
-- Surabi Properties — Row Level Security Policies
--
-- Run AFTER 001_initial_schema.sql
--
-- These policies are the LAST LINE OF DEFENCE against unauthorized access.
-- Even if middleware fails, the database will reject unauthorized queries.
-- ============================================================

-- ─── Enable RLS on all tables ───────────────────────────────────────────────
ALTER TABLE public.users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings  ENABLE ROW LEVEL SECURITY;

-- ─── Helper: check if current user has a given role ─────────────────────────
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users
  WHERE id = auth.uid() AND is_active = true
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_owner_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
      AND role = 'admin'
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── USERS ──────────────────────────────────────────────────────────────────
-- Only admins can read/write users table.
-- Owners can read their own record.
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_admin_all" ON public.users
  FOR ALL USING (public.is_admin());

-- ─── PROPERTIES ─────────────────────────────────────────────────────────────
-- Public: can read available/reserved/sold properties
-- Owner/Admin: full CRUD
CREATE POLICY "properties_public_read" ON public.properties
  FOR SELECT USING (status IN ('available', 'reserved', 'sold'));

CREATE POLICY "properties_staff_all" ON public.properties
  FOR ALL USING (public.is_owner_or_admin());

-- ─── PROPERTY IMAGES ────────────────────────────────────────────────────────
CREATE POLICY "property_images_public_read" ON public.property_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
        AND p.status IN ('available', 'reserved', 'sold')
    )
  );

CREATE POLICY "property_images_staff_all" ON public.property_images
  FOR ALL USING (public.is_owner_or_admin());

-- ─── LEADS ──────────────────────────────────────────────────────────────────
-- Public: can INSERT only (submit requirement form)
-- Owner/Admin: full access
CREATE POLICY "leads_public_insert" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "leads_staff_all" ON public.leads
  FOR ALL USING (public.is_owner_or_admin());

-- ─── MEETINGS ───────────────────────────────────────────────────────────────
-- Only owner/admin
CREATE POLICY "meetings_staff_all" ON public.meetings
  FOR ALL USING (public.is_owner_or_admin());

-- ─── POSTS (Surabi Stories) ─────────────────────────────────────────────────
-- Public: can read published posts
-- Owner/Admin: full CRUD
CREATE POLICY "posts_public_read" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "posts_staff_all" ON public.posts
  FOR ALL USING (public.is_owner_or_admin());

-- ─── POST LIKES ─────────────────────────────────────────────────────────────
-- Public: can INSERT and SELECT (UNIQUE constraint prevents duplicates)
-- Owner/Admin: full access
CREATE POLICY "post_likes_public_read" ON public.post_likes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.posts p
      WHERE p.id = post_id AND p.status = 'published'
    )
  );

CREATE POLICY "post_likes_public_insert" ON public.post_likes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.posts p
      WHERE p.id = post_id AND p.status = 'published'
    )
  );

CREATE POLICY "post_likes_staff_all" ON public.post_likes
  FOR ALL USING (public.is_owner_or_admin());

-- ─── COMMENTS ───────────────────────────────────────────────────────────────
-- Public: can INSERT (pending), can SELECT approved comments
-- Owner/Admin: full access (approve, delete, view pending)
CREATE POLICY "comments_public_insert" ON public.comments
  FOR INSERT WITH CHECK (
    status = 'pending'
    AND EXISTS (
      SELECT 1 FROM public.posts p
      WHERE p.id = post_id AND p.status = 'published'
    )
  );

CREATE POLICY "comments_public_read_approved" ON public.comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "comments_staff_all" ON public.comments
  FOR ALL USING (public.is_owner_or_admin());

-- ─── TESTIMONIALS ───────────────────────────────────────────────────────────
-- Public: read active testimonials
-- Admin: full CRUD
CREATE POLICY "testimonials_public_read" ON public.testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "testimonials_admin_all" ON public.testimonials
  FOR ALL USING (public.is_admin());

-- ─── ACHIEVEMENTS ───────────────────────────────────────────────────────────
CREATE POLICY "achievements_public_read" ON public.achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "achievements_admin_all" ON public.achievements
  FOR ALL USING (public.is_admin());

-- ─── SERVICES ───────────────────────────────────────────────────────────────
CREATE POLICY "services_public_read" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "services_admin_all" ON public.services
  FOR ALL USING (public.is_admin());

-- ─── CONTACT MESSAGES ───────────────────────────────────────────────────────
-- Public: can INSERT only
-- Owner/Admin: full access
CREATE POLICY "contact_messages_public_insert" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "contact_messages_staff_all" ON public.contact_messages
  FOR ALL USING (public.is_owner_or_admin());

-- ─── SITE SETTINGS ──────────────────────────────────────────────────────────
-- Public: can read settings (needed for displaying business info)
-- Admin: can update
CREATE POLICY "site_settings_public_read" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "site_settings_admin_write" ON public.site_settings
  FOR ALL USING (public.is_admin());
