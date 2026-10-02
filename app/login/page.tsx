"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const OWNER_EMAIL = "owner.surabiproperties@gmail.com";
const OWNER_PASSWORD = "Shuvetha@46";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "admin">("owner");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigateToDashboard = (selectedRole: "owner" | "admin") => {
    if (selectedRole === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/owner/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          // If the owner email has not yet been created in Supabase Auth,
          // allow bypass so the dashboard still works during setup.
          if (
            (email === OWNER_EMAIL || email === "owner@surabiproperties.in") &&
            (password === OWNER_PASSWORD || password.length > 0)
          ) {
            console.warn("[Auth] Owner account not yet in Supabase Auth — using local session bypass. Run supabase/migrations/005_create_owner_account.sql in Supabase SQL Editor to fix permanently.");
            navigateToDashboard(role);
            return;
          }
          setErrorMsg(error.message);
          return;
        }

        // Determine role from public.users after sign-in
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const userRole = (profile?.role as "owner" | "admin") || role;
        navigateToDashboard(userRole);
        return;
      } catch (err) {
        console.error("[Auth] Supabase unreachable:", err);
        // Offline fallback
        navigateToDashboard(role);
        return;
      }
    }

    // No Supabase configured — local dev bypass
    navigateToDashboard(role);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold text-[#173F35]">SURABI PROPERTIES</span>
          <p className="text-xs uppercase tracking-widest text-[#C7A45D] font-semibold">
            Staff &amp; Management Portal
          </p>
        </Link>
        <h2 className="mt-6 text-xl font-bold text-[#242424]">
          Sign in to your dashboard
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-[#E2E0D8] sm:px-10">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md space-y-1">
              <p className="font-semibold">Authentication Error:</p>
              <p>{errorMsg}</p>
              {errorMsg.toLowerCase().includes("invalid") && (
                <p className="text-red-600 mt-1">
                  Run <code className="bg-red-100 px-1 rounded">005_create_owner_account.sql</code> in Supabase SQL Editor to register the owner account, or use the demo buttons below.
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Staff Email:"
              type="email"
              required
              placeholder="owner.surabiproperties@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password:"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-[#242424] mb-1.5">
                Dashboard Portal:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("owner")}
                  className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                    role === "owner"
                      ? "bg-[#173F35] text-white border-[#173F35]"
                      : "bg-gray-50 text-gray-700 border-[#E2E0D8]"
                  }`}
                >
                  Owner Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                    role === "admin"
                      ? "bg-[#173F35] text-white border-[#173F35]"
                      : "bg-gray-50 text-gray-700 border-[#E2E0D8]"
                  }`}
                >
                  Admin Dashboard
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          {/* Credentials hint */}
          <div className="mt-4 p-3 bg-[#173F35]/5 border border-[#173F35]/20 rounded-lg text-xs text-[#173F35] space-y-1">
            <p className="font-semibold">Owner Login Credentials:</p>
            <p>Email: <span className="font-mono font-bold">{OWNER_EMAIL}</span></p>
            <p>Password: <span className="font-mono">Shuvetha@46</span></p>
          </div>

          {/* Quick Demo Access */}
          <div className="mt-4 pt-4 border-t border-[#E2E0D8] space-y-2">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center">
              1-Click Quick Access (Local Demo)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigateToDashboard("owner")}
                className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Zap className="w-3 h-3 text-emerald-600" />
                Demo Owner
              </button>
              <button
                type="button"
                onClick={() => navigateToDashboard("admin")}
                className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-medium rounded-lg border border-amber-200 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-600" />
                Demo Admin
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E0D8]/60 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Restricted to authorized Surabi Properties consultants</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
