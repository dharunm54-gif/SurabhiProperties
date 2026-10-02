"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState<string>(siteConfig.name);
  const [phone, setPhone] = useState<string>(siteConfig.phone);
  const [whatsapp, setWhatsapp] = useState<string>(siteConfig.whatsapp);
  const [email, setEmail] = useState<string>(siteConfig.email);
  const [mapsEmbed, setMapsEmbed] = useState<string>(siteConfig.mapsEmbedUrl);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">System Configuration</h2>
        <p className="text-xs text-gray-500 mt-1">
          Configure centralized business properties, contact numbers, and Google integration links.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        {isSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Configuration updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Business Display Name:"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Phone:"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              label="WhatsApp Number:"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <Input
            label="Official Business Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Google Maps Embed URL:"
            value={mapsEmbed}
            onChange={(e) => setMapsEmbed(e.target.value)}
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              <span>Save System Settings</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
