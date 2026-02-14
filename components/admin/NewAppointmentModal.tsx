"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch"; // Placeholder for Toggle
import { X, ChevronDown, Check, Calendar, Clock, User, Scissors } from "lucide-react";
import { format, addDays } from "date-fns";
import { he } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import clsx from "clsx";

interface NewAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultDate?: Date;
}

interface Service {
    id: string;
    name: string;
    duration_min: number;
    price: number;
}

export function NewAppointmentModal({ isOpen, onClose, defaultDate = new Date() }: NewAppointmentModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<{ slot_start: string } | null>(null);
    const [whatsappReminder, setWhatsappReminder] = useState(true);

    // Fetch Services
    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from("services").select("*");
            if (data) setServices(data);
        }
        if (isOpen) fetchServices();
    }, [isOpen]);

    const handleCreate = () => {
        // Here we would call supabase.insert('appointments'...)
        // For now, let's just alert and close
        const dateStr = selectedSlot ? format(new Date(selectedSlot.slot_start), "d בMMMM HH:mm", { locale: he }) : "";
        alert(`תור נקבע בהצלחה!\nשירות: ${selectedService?.name}\nזמן: ${dateStr}\nתזכורת וואטסאפ: ${whatsappReminder ? "כן" : "לא"}`);
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in" />
                <Dialog.Content
                    className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-[#0A0A0A] border border-white/10 p-6 shadow-2xl animate-in zoom-in-95"
                    dir="rtl"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <Dialog.Title className="text-xl font-bold text-white">
                            קביעת תור חדש
                        </Dialog.Title>
                        <Dialog.Close className="text-neutral-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </Dialog.Close>
                    </div>

                    <div className="space-y-6">

                        {/* 1. Service Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">בחר שירות</label>
                            <div className="grid grid-cols-1 gap-2">
                                {services.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSelectedService(s)}
                                        className={clsx(
                                            "flex justify-between items-center p-3 rounded-xl border transition-all text-sm",
                                            selectedService?.id === s.id
                                                ? "bg-[#007AFF]/20 border-[#007AFF] text-white"
                                                : "bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Scissors className="w-4 h-4 opacity-50" />
                                            <span>{s.name} ({s.duration_min} דק')</span>
                                        </div>
                                        <span className="font-bold">₪{s.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Time Slot Picker (Conditional) */}
                        {selectedService && (
                            <div className="space-y-2 animate-in slide-in-from-top-4">
                                <label className="text-sm font-medium text-neutral-400">בחר שעה</label>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {/* We hardcode provider ID for now, or pass it in props */}
                                    <TimeSlotPicker
                                        providerId="658fe224-5bc9-4acc-987a-137191174b2b" // Orel
                                        selectedDate={addDays(new Date(), 2)} // Next Monday Logic for Demo
                                        onSelectSlot={setSelectedSlot}
                                    />
                                </div>
                            </div>
                        )}

                        {/* 3. WhatsApp Toggle */}
                        <div className="flex items-center justify-between p-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#25D366]/20 rounded-full text-[#25D366]">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">שלח תזכורת בוואטסאפ</p>
                                    <p className="text-xs text-[#25D366]/80">הלקוח יקבל הודעה אוטומטית</p>
                                </div>
                            </div>
                            {/* Mock Switch */}
                            <button
                                onClick={() => setWhatsappReminder(!whatsappReminder)}
                                className={clsx(
                                    "w-10 h-6 rounded-full relative transition-colors",
                                    whatsappReminder ? "bg-[#25D366]" : "bg-neutral-600"
                                )}
                            >
                                <div className={clsx(
                                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                    whatsappReminder ? "left-1" : "left-5" // RTL logic, inverted check
                                )} />
                            </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-3 mt-6">
                            <button
                                disabled={!selectedService || !selectedSlot}
                                onClick={handleCreate}
                                className="flex-1 py-2.5 bg-[#007AFF] hover:bg-[#006AD1] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all"
                            >
                                קבע תור
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-xl font-medium transition-all"
                            >
                                ביטול
                            </button>
                        </div>

                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
