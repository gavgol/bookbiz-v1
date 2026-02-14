"use client";

import { useState } from "react";
import { format, addMinutes, isSameDay, parseISO } from "date-fns";
import { he } from "date-fns/locale";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface Appointment {
    id: string;
    start_time: string;
    end_time: string;
    client_id: string; // In real app, this would be a joined object
    service_id: string;
}

interface DailyCalendarProps {
    date: Date;
    appointments: Appointment[];
}

const HOURS = Array.from({ length: 11 }, (_, i) => 9 + i); // 09:00 - 19:00

export function DailyCalendar({ date, appointments }: DailyCalendarProps) {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Helper to place appointments
    const getAppointmentStyle = (start: string, end: string) => {
        const startDate = parseISO(start);
        const endDate = parseISO(end);

        const startHour = startDate.getHours();
        const startMin = startDate.getMinutes();
        const durationMins = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

        const top = (startHour - 9) * 60 + startMin; // Pixels from top (1min = 1px)
        const height = durationMins;

        return { top: `${top}px`, height: `${height}px` };
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">

            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">
                    {format(date, "EEEE, d בMMMM", { locale: he })}
                </h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#007AFF] text-white rounded-full text-sm font-medium hover:bg-[#006AD1] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>תור חדש</span>
                </button>
            </div>

            {/* Grid */}
            <div className="relative h-[660px] overflow-y-auto"> {/* 11 hours * 60px */}

                {/* Time Labels */}
                <div className="absolute top-0 right-0 w-16 h-full border-l border-white/5 bg-white/2">
                    {HOURS.map((hour) => (
                        <div key={hour} className="h-[60px] border-b border-white/5 text-xs text-neutral-500 flex items-start justify-center pt-2">
                            {hour}:00
                        </div>
                    ))}
                </div>

                {/* Calendar Body */}
                <div className="absolute top-0 right-16 left-0 h-full relative">

                    {/* Grid Lines */}
                    {HOURS.map((hour) => (
                        <div key={hour} className="h-[60px] border-b border-white/5" />
                    ))}

                    {/* Appointments */}
                    {appointments.map((apt) => (
                        <motion.div
                            key={apt.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute left-2 right-2 rounded-lg bg-[#007AFF]/20 border-l-4 border-[#007AFF] px-3 py-2 cursor-pointer hover:brightness-110 transition-all z-10"
                            style={getAppointmentStyle(apt.start_time, apt.end_time)}
                        >
                            <p className="text-xs font-bold text-[#007AFF]">תספורת גברים</p>
                            <p className="text-[10px] text-neutral-300">054-1234567</p>
                        </motion.div>
                    ))}

                    {/* Current Time Indicator (Mock) */}
                    <div className="absolute top-[180px] left-0 right-0 border-t border-red-500 z-20 pointer-events-none">
                        <span className="absolute right-0 -top-2 w-2 h-2 bg-red-500 rounded-full" />
                    </div>

                </div>

            </div>
        </div>
    );
}
