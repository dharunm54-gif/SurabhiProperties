"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit message");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#C7A45D] uppercase tracking-widest">
            Reach Out Directly
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#173F35] mt-2">
            Contact Surabi Properties
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Have a question about a plot, bank loan eligibility, or want to schedule an office visit?
            We are here to assist you with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#E2E0D8] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#173F35] border-b border-[#E2E0D8]/60 pb-3">
              Office Details &amp; Contact
            </h2>

            <div className="space-y-5 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#242424]">Registered Office</p>
                  <p className="mt-0.5 leading-relaxed">{siteConfig.address.full}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#242424]">Phone Line</p>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[#173F35] font-medium">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#242424]">WhatsApp Direct</p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    Chat with Consultant (+91 {siteConfig.whatsapp.substring(2)})
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#242424]">Email Address</p>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#173F35]">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#242424]">Working Hours</p>
                  <p className="mt-0.5">{siteConfig.workingHours.weekdays}</p>
                  <p className="text-xs text-gray-500">{siteConfig.workingHours.sunday}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E0D8]/60">
              <a
                href={siteConfig.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#173F35] hover:bg-[#1F5447] text-white font-semibold text-sm py-3 px-4 rounded-md transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#C7A45D]" />
                <span>Get Directions to Office</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E2E0D8] shadow-sm">
            <h2 className="text-xl font-bold text-[#173F35] mb-2">
              Send a Message to the Consultant
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out this form and we will get back to you within 24 hours.
            </p>

            {isSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#173F35]">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. We will review your inquiry and contact you promptly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name: *"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Phone Number: *"
                    required
                    type="tel"
                    placeholder="+91 98421 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address (Optional):"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="Subject / Topic:"
                    placeholder="e.g. Plot enquiry or Home Loan"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Your Message: *"
                  required
                  rows={4}
                  placeholder="How can we assist you with your property or loan requirement?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map at bottom */}
        <div className="rounded-2xl overflow-hidden border border-[#E2E0D8] shadow-sm h-80 bg-gray-100">
          <iframe
            src={siteConfig.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Surabi Properties Map"
          />
        </div>
      </div>
    </div>
  );
}
