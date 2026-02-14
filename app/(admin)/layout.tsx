import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans" dir="rtl">
            <Sidebar />

            {/* Content Area - shifted left because sidebar is on the right */}
            <div className="pr-64 flex flex-col min-h-screen transition-all duration-300">
                <TopNav />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
