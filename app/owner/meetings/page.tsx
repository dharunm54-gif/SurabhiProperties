import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";

export default function OwnerMeetingsPage() {
  const meetings = [
    {
      id: "m1",
      clientName: "Dr. K. Ramanathan",
      clientPhone: "+91 94431 88899",
      date: "Monday, 15 Sep 2026",
      time: "10:30 AM",
      location: "Surabi Properties Office, Gandhiji Road",
      purpose: "SBI MaxGain Home Loan Document Vetting & Estimation Handover",
      status: "scheduled",
    },
    {
      id: "m2",
      clientName: "Mr. G. Selvakumar",
      clientPhone: "+91 98421 77722",
      date: "Wednesday, 17 Sep 2026",
      time: "04:00 PM",
      location: "Site Visit: Raja Rajan Nagar (Plots 14 & 15)",
      purpose: "On-site boundary inspection & parent deed photocopies review",
      status: "scheduled",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">Consultation Meetings &amp; Site Visits</h2>
        <p className="text-xs text-gray-500 mt-1">
          Keep track of scheduled office meetings, client consultations, and accompanied site visits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#173F35]">{m.clientName}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-[#C7A45D]" /> {m.clientPhone}
                </p>
              </div>
              <Badge variant="green">{m.status.toUpperCase()}</Badge>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C7A45D]" />
                <span className="font-medium">{m.date}</span>
                <Clock className="w-4 h-4 text-[#C7A45D] ml-2" />
                <span className="font-medium">{m.time}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C7A45D] shrink-0 mt-0.5" />
                <span>{m.location}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 border border-gray-100">
              <strong>Agenda:</strong> {m.purpose}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
