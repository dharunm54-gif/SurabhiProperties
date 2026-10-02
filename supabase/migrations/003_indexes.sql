-- ============================================================
-- Migration: 003_indexes.sql
-- Surabi Properties — Database Performance Indexes
-- ============================================================

-- Properties indexes
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);

-- Leads indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);

-- Stories / Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- Comments & Likes
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(status);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_visitor ON public.post_likes(visitor_id);

-- Testimonials & Achievements
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON public.testimonials(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_achievements_active ON public.achievements(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active, sort_order);
