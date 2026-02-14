"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { format, addDays } from "date-fns";
import { Loader2, Calendar } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// --- Types ---
interface TimeSlot {
    slot_start: string; // ISO timestamp
    slot_end: string;
}

interface TimeSlotPickerProps {
    providerId: string;
    selectedDate?: Date;
    onSelectSlot: (slot: TimeSlot) => void;
}

// --- Utils ---
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function TimeSlotPicker({
    providerId,
    selectedDate = new Date(),
    onSelectSlot,
}: TimeSlotPickerProps) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSlotStart, setSelectedSlotStart] = useState<string | null>(null);

    // Fetch Slots
    useEffect(() => {
        async function fetchSlots() {
            setLoading(true);
            setError(null);
            try {
                const dateStr = format(selectedDate, "yyyy-MM-dd");

                // Call the RPC function we built in Phase 3
                const { data, error } = await supabase.rpc("get_available_slots", {
                    p_provider_id: providerId,
                    p_date: dateStr,
                    p_service_duration: 30, // Default 30 mins for now
                });

                if (error) throw error;
                setSlots(data || []);
            } catch (err: any) {
                console.error("Error fetching slots:", err);
                setError("Could not load availability.");
            } finally {
                setLoading(false);
            }
        }

        if (providerId) {
            fetchSlots();
        }
    }, [providerId, selectedDate]);

    // --- Render Helpers ---

    // 1. Loading State (Skeleton)
    if (loading) {
        return (
            <div className="grid grid-cols-3 gap-3 p-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-12 bg-white/5 rounded-xl border border-white/5"
                    />
                ))}
            </div>
        );
    }

    // 2. Error State
    if (error) {
        return (
            <div className="text-center p-6 text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    // 3. Empty State
    if (slots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-neutral-400">
                <Calendar className="w-8 h-8 mb-2 opacity-50" />
                <p>No slots available on this date.</p>
            </div>
        );
    }

    // 4. Success State (The Grid)
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <AnimatePresence>
                {slots.map((slot, index) => {
                    const startTime = new Date(slot.slot_start);
                    const timeLabel = format(startTime, "HH:mm");
                    const isSelected = selectedSlotStart === slot.slot_start;

                    return (
                        <motion.button
                            key={slot.slot_start}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }} // Staggered entry
                            onClick={() => {
                                setSelectedSlotStart(slot.slot_start);
                                onSelectSlot(slot);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "relative py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                                "border backdrop-blur-md shadow-lg",
                                isSelected
                                    ? "bg-[#007AFF] border-[#007AFF] text-white shadow-[0_0_15px_rgba(0,122,255,0.4)]"
                                    : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            {timeLabel}

                            {/* Subtle Glow Effect on Hover (if not selected) */}
                            {!isSelected && (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                            )}
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
