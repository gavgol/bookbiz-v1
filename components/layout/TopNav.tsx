"use client";

import { Bell, Search } from "lucide-react";

export function TopNav() {
    return (
        <header className="sticky top-0 z-10 w-full h-16 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">

            {/* Search / Breadcrumbs */}
            <div className="flex items-center w-full max-w-sm">
                <div className="relative w-full">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="חיפוש לקוחות, תורים..."
                        className="w-full h-9 pr-9 pl-4 bg-white/5 border border-white/5 rounded-full text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:bg-white/10 focus:border-white/10 transition-all text-right"
                        dir="rtl"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-neutral-400 hover:text-white">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 left-2.5 w-1.5 h-1.5 bg-[#007AFF] rounded-full" />
                </button>
            </div>

        </header>
    );
}
