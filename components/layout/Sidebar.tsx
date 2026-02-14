"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    Scissors
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
    { name: "דאשבורד", href: "/dashboard", icon: LayoutDashboard },
    { name: "יומן תורים", href: "/dashboard/schedule", icon: CalendarDays },
    { name: "לקוחות", href: "/dashboard/clients", icon: Users },
    { name: "הגדרות", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed right-0 top-0 z-20 h-full w-64 bg-[#0A0A0A]/90 backdrop-blur-xl border-l border-white/10 flex flex-col font-sans">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <Scissors className="w-5 h-5 text-[#007AFF] ml-2" />
                <span className="text-xl font-bold bg-gradient-to-l from-white to-neutral-400 bg-clip-text text-transparent">
                    BookBiz
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            {/* Active Background Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-lg shadow-[0_0_15px_rgba(0,122,255,0.1)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}

                            {/* Icon & Text */}
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 ml-3 relative z-10 transition-colors", // ml-3 for RTL spacing
                                    isActive ? "text-[#007AFF]" : "text-neutral-400 group-hover:text-white"
                                )}
                            />
                            <span
                                className={clsx(
                                    "relative z-10 transition-colors",
                                    isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-neutral-700 to-neutral-900 border border-white/10" />
                    <div className="text-right"> {/* Right align text */}
                        <p className="text-sm font-medium text-white">אוראל הספר</p>
                        <p className="text-xs text-neutral-500">תוכנית פרו</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
