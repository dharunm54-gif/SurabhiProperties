"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "admin">("owner");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // If Supabase is configured, attempt actual Supabase Auth
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
      }

      // Successful login / Demo bypass mode
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/owner/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
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
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Staff Email:"
              type="email"
              required
              placeholder="owner@surabiproperties.in"
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

          <div className="mt-6 pt-4 border-t border-[#E2E0D8]/60 text-center">
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
