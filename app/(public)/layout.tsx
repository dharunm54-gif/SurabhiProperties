import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#242424]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
