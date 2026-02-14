"use client";

import { Search, MoreHorizontal, Phone, Mail, MessageCircle } from "lucide-react";

const MOCK_CLIENTS = [
    { id: 1, name: "ישראל ישראלי", phone: "050-1234567", email: "israel@gmail.com", lastVisit: "10/02/2026" },
    { id: 2, name: "דוד כהן", phone: "054-9876543", email: "david@yahoo.com", lastVisit: "05/02/2026" },
    { id: 3, name: "עומר אדם", phone: "052-5555555", email: "omer@music.com", lastVisit: "12/02/2026" },
];

export function ClientsTable() {

    const sendWhatsApp = (name: string, phone: string) => {
        // Format phone to international format (remove leading 0, add 972)
        const formattedPhone = phone.replace(/^0/, "972").replace(/-/g, "");
        const message = `היי ${name}, זה אוראל הספר. רציתי לוודא לגבי התור שלך...`;
        const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

            {/* Toolbar */}
            <div className="p-4 border-b border-white/5 flex gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="חיפוש לקוח..."
                        className="w-full h-9 pr-9 pl-4 bg-white/5 border border-white/5 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:bg-white/10 focus:border-white/10 text-right transition-all"
                        dir="rtl"
                    />
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-right">
                <thead className="bg-white/5 text-neutral-400">
                    <tr>
                        <th className="px-6 py-3 font-medium">שם מלא</th>
                        <th className="px-6 py-3 font-medium">טלפון</th>
                        <th className="px-6 py-3 font-medium">אימייל</th>
                        <th className="px-6 py-3 font-medium">ביקור אחרון</th>
                        <th className="px-6 py-3 font-medium">פעולות</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {MOCK_CLIENTS.map((client) => (
                        <tr key={client.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{client.name}</td>
                            <td className="px-6 py-4 text-neutral-300">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-neutral-500" />
                                    {client.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-neutral-300">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-neutral-500" />
                                    {client.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-neutral-300">{client.lastVisit}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <button
                                    onClick={() => sendWhatsApp(client.name, client.phone)}
                                    className="p-1.5 rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                                    title="שלח הודעת וואטסאפ"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-white/10 text-neutral-500 hover:text-white transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
