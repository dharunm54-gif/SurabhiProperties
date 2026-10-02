-- ============================================================
-- Migration: 005_create_owner_account.sql
-- Creates the official owner login: owner.surabiproperties@gmail.com
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ftkglpeqwwtiblcdrtwl/sql
-- ============================================================

-- Step 1: Clean up any orphaned/partial auth records for owner email
-- (safe to run even if the record doesn't exist)
DELETE FROM auth.identities
  WHERE identity_data->>'email' = 'owner.surabiproperties@gmail.com';

DELETE FROM auth.users
  WHERE email = 'owner.surabiproperties@gmail.com';

DELETE FROM public.users
  WHERE email = 'owner.surabiproperties@gmail.com';

-- Step 2: Create the owner user directly in auth.users
-- Password hash is for: Shuvetha@46
-- This uses bcrypt — Supabase Auth will recognize it correctly
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'owner.surabiproperties@gmail.com',
  crypt('Shuvetha@46', gen_salt('bf')),
  now(),
  now(),
  '',
  now(),
  '',
  null,
  '',
  '',
  null,
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Shenthil Kumar","role":"owner"}',
  false,
  now(),
  now(),
  null,
  null,
  '',
  '',
  null,
  '',
  0,
  null,
  '',
  null,
  false,
  null
)
ON CONFLICT (email) DO UPDATE SET
  encrypted_password = crypt('Shuvetha@46', gen_salt('bf')),
  email_confirmed_at = now(),
  raw_user_meta_data = '{"full_name":"Shenthil Kumar","role":"owner"}',
  updated_at = now();

-- Step 3: Make sure public.users record is correct
INSERT INTO public.users (id, email, full_name, role, is_active)
  SELECT id, email, 'Shenthil Kumar', 'owner', true
  FROM auth.users WHERE email = 'owner.surabiproperties@gmail.com'
ON CONFLICT (email) DO UPDATE SET
  full_name = 'Shenthil Kumar',
  role = 'owner',
  is_active = true,
  updated_at = now();

-- Step 4: Create the auth identity record
INSERT INTO auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  u.id::text,
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email),
  'email',
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email = 'owner.surabiproperties@gmail.com'
ON CONFLICT DO NOTHING;

-- Verify the owner was created
SELECT u.id, u.email, u.email_confirmed_at, pu.full_name, pu.role
FROM auth.users u
JOIN public.users pu ON pu.id = u.id
WHERE u.email = 'owner.surabiproperties@gmail.com';
