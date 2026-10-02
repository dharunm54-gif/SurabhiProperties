-- ============================================================
-- Migration: 005_create_owner_account.sql
-- Creates the official owner login: owner.surabiproperties@gmail.com
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ftkglpeqwwtiblcdrtwl/sql/new
-- ============================================================

-- Step 1: Clean out any partial/orphaned records first
-- (all cascades are handled manually below; safe to run multiple times)

DELETE FROM auth.identities
  WHERE identity_data->>'email' = 'owner.surabiproperties@gmail.com';

DELETE FROM auth.sessions
  WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'owner.surabiproperties@gmail.com'
  );

DELETE FROM public.users
  WHERE email = 'owner.surabiproperties@gmail.com';

DELETE FROM auth.users
  WHERE email = 'owner.surabiproperties@gmail.com';

-- Step 2: Insert the owner into auth.users with a confirmed email
DO $$
DECLARE
  v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    is_sso_user,
    deleted_at
  ) VALUES (
    v_uid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'owner.surabiproperties@gmail.com',
    crypt('Shuvetha@46', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Shenthil Kumar","role":"owner"}',
    false,
    now(),
    now(),
    false,
    null
  );

  -- Step 3: Create the email identity record
  INSERT INTO auth.identities (
    id,
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    v_uid::text,
    v_uid,
    jsonb_build_object(
      'sub',   v_uid::text,
      'email', 'owner.surabiproperties@gmail.com'
    ),
    'email',
    now(),
    now(),
    now()
  );

  -- Step 4: Sync into public.users (the trigger may already do this,
  -- but we force-insert to guarantee the owner role)
  INSERT INTO public.users (id, email, full_name, role, is_active, created_at, updated_at)
  VALUES (
    v_uid,
    'owner.surabiproperties@gmail.com',
    'Shenthil Kumar',
    'owner',
    true,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name  = 'Shenthil Kumar',
    role       = 'owner',
    is_active  = true,
    updated_at = now();

  RAISE NOTICE 'Owner account created successfully with id = %', v_uid;
END;
$$;

-- Step 5: Verify — should return one row with role = owner
SELECT
  u.id,
  u.email,
  u.email_confirmed_at,
  pu.full_name,
  pu.role,
  pu.is_active
FROM auth.users u
JOIN public.users pu ON pu.id = u.id
WHERE u.email = 'owner.surabiproperties@gmail.com';
