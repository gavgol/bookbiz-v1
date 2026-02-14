"use client"; // Needs client for state

import { useState } from "react";
import { DailyCalendar } from "@/components/admin/DailyCalendar";
import { NewAppointmentModal } from "@/components/admin/NewAppointmentModal";
import { Plus } from "lucide-react";
import { format } from "date-fns";

// Mock Data for "Next Monday"
const MOCK_APPOINTMENTS = [
    {
        id: "1",
        start_time: "2026-02-16T10:00:00",
        end_time: "2026-02-16T10:45:00",
        client_id: "c1",
        service_id: "s1"
    },
    {
        id: "2",
        start_time: "2026-02-16T13:30:00",
        end_time: "2026-02-16T14:00:00",
        client_id: "c2",
        service_id: "s1"
    }
];

export default function SchedulePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">יומן תורים</h1>

                <div className="flex gap-3">
                    {/* Date Picker Placeholder */}
                    <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
                        <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white">פברואר 2026</button>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#007AFF] text-white rounded-full text-sm font-medium hover:bg-[#006AD1] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>תור חדש</span>
                    </button>
                </div>
            </div>

            <DailyCalendar
                date={new Date("2026-02-16")}
                appointments={MOCK_APPOINTMENTS}
            />

            {/* The Modal */}
            <NewAppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
