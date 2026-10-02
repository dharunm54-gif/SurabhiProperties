"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Check } from "lucide-react";

export default function OwnerSettingsPage() {
  const [phone, setPhone] = useState<string>(siteConfig.phone);
  const [whatsapp, setWhatsapp] = useState<string>(siteConfig.whatsapp);
  const [email, setEmail] = useState<string>(siteConfig.email);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">Owner Account &amp; Contact Settings</h2>
        <p className="text-xs text-gray-500 mt-1">
          Configure business phone numbers and inquiry destination details.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        {isSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Primary Consultant Phone:"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            label="WhatsApp Number (Digits with country code, e.g. 9894331557):"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <Input
            label="Notification Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              <span>Update Settings</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
