# Quick Start Guide — Surabi Properties

Get the entire application running locally in under **2 minutes**.

---

## ⚡ Option 1: 1-Click Launch (Windows)

Simply double-click the **`quick-start.bat`** file inside the project directory:

```text
surabi-properties/
├── quick-start.bat  <-- Double-click this!
```

This script will automatically:
1. Detect Node.js
2. Set up your `.env.local` file
3. Install required npm packages if missing
4. Launch the local development server at **http://localhost:3000**
5. Open your browser automatically

---

## 💻 Option 2: Command Line Setup (3 Steps)

If you prefer using the terminal (Command Prompt, PowerShell, or bash):

### Step 1: Navigate to the project folder
```bash
cd surabi-properties
```

### Step 2: Install dependencies (if not already installed)
```bash
npm install
```

### Step 3: Run the project
```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Key URLs & Portals

| Page | URL | Purpose |
|---|---|---|
| **Public Website** | [http://localhost:3000](http://localhost:3000) | Homepage, Quick Requirement form, Featured Properties, Surabi Stories |
| **Properties** | [http://localhost:3000/properties](http://localhost:3000/properties) | Property listings with plot, house, & commercial filters |
| **Stories Feed** | [http://localhost:3000/stories](http://localhost:3000/stories) | Social-style milestones, loan approvals & insights |
| **Contact & Map** | [http://localhost:3000/contact](http://localhost:3000/contact) | Office contact form & directions |
| **Staff Login** | [http://localhost:3000/login](http://localhost:3000/login) | Staff portal entry (select Owner or Admin) |
| **Owner Dashboard** | [http://localhost:3000/owner/dashboard](http://localhost:3000/owner/dashboard) | Lead CRM, Property Manager, Story Publisher |
| **Admin Dashboard** | [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) | Master system controls, staff accounts, testimonials |

---

## 📝 Immediate Customization

To change the phone number, WhatsApp number, office address, or consultant bio, edit this **single file**:

👉 **`lib/config/site.ts`**

All changes made here automatically propagate across the navbar, footer, contact page, hero section, and metadata across the entire website.

---

## 🗄️ Connecting Live Supabase Database (Optional)

The application includes rich built-in data and runs standalone without any database configuration. 

When you want to connect your live Supabase database:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the 4 files in `supabase/migrations/`:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_indexes.sql`
   - `004_seed_demo.sql`
3. Paste your project URL and keys into **`.env.local`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Restart your development server (`npm run dev`).
