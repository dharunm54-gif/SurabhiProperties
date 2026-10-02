# Production Deployment Guide

## Deploying to Vercel (Recommended)

1. Push your code repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `surabi-properties` repository.
4. Set Framework Preset to **Next.js**.
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://surabiproperties.in`)
6. Click **Deploy**.

## Domain Setup
1. In Vercel Project Settings > Domains, enter `surabiproperties.in`.
2. Follow DNS instructions to add the `A` and `CNAME` records at your domain registrar.
3. SSL will be automatically provisioned via Let's Encrypt.
