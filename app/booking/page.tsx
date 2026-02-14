"use client";

import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { useState } from "react";
import { format, addDays } from "date-fns";

// Orel's UUID (Fixed for Demo)
const PROVIDER_ID = "658fe224-5bc9-4acc-987a-137191174b2b";

export default function BookingPage() {
  // FIX: Force Next Monday (Feb 16, 2026) because today is Saturday
  // In a real app, this would be `new Date()` or selected from a calendar.
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    // Simple logic: If Sat(6) -> +2, If Sun(0) -> +1
    const day = d.getDay();
    if (day === 6) return addDays(d, 2);
    if (day === 0) return addDays(d, 1);
    return d;
  });

  const [selectedSlot, setSelectedSlot] = useState<{ slot_start: string } | null>(null);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col items-center justify-center p-6 font-sans">

      {/* Header */}
      <div className="mb-12 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
          Select a Time
        </h1>
        <p className="text-[#A1A1A1] text-sm">
          Booking with <span className="text-[#007AFF] font-medium">Orel The Barber</span>
        </p>
      </div>

      {/* The Premium Component */}
      <div className="w-full max-w-md">
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-white">
              {format(selectedDate, "EEEE, MMMM d")}
            </h2>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>
          </div>

          <TimeSlotPicker
            providerId={PROVIDER_ID}
            selectedDate={selectedDate} // Pass the fixed date
            onSelectSlot={(slot) => setSelectedSlot(slot)}
          />

          {/* Selection Confirmation */}
          {selectedSlot && (
            <div className="mt-8 p-4 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-xl flex justify-between items-center animate-in fade-in slide-in-from-bottom-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#007AFF] font-bold">Selected</p>
                <p className="text-white font-medium">
                  {format(new Date(selectedSlot.slot_start), "h:mm a")}
                </p>
              </div>
              <button className="px-5 py-2 bg-[#007AFF] hover:bg-[#006AD1] text-white text-sm font-medium rounded-full shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
                Confirm
              </button>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}
