import Link from "next/link";
import { ArrowLeft, Star, Scissors, TrendingUp } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Fetch Insights (Server Component)
async function getInsights() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll() { } // Read only
            },
        }
    );

    const { data } = await supabase.from("business_insights").select("*").limit(2).order("published_at", { ascending: false });
    return data || [];
}

export default async function LandingPage() {
    const insights = await getInsights();

    return (
        <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-[#007AFF]/30 overflow-x-hidden" dir="rtl">

            {/* 1. Navbar (Sticky Glass) */}
            <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 transition-all">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#007AFF]/10 rounded-lg">
                        <Scissors className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">BookBiz</span>
                </div>
                <Link
                    href="/login"
                    className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
                >
                    כניסת ספרים
                </Link>
            </nav>

            {/* 2. Hero Section (Immersive) */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">

                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#007AFF]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-10">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md mb-6 hover:border-[#007AFF]/30 transition-colors cursor-default">
                        <Star className="w-3.5 h-3.5 fill-[#007AFF] text-[#007AFF]" />
                        <span className="text-sm font-medium text-neutral-200">המספרה המובילה בתל אביב</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-500 leading-[1.1] pb-2">
                        חוויית התספורת <br className="hidden md:block" /> של המחר.
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        בוק-ביז מביאה את הסטנדרט הבינלאומי לעסק שלך. דיוק, סטייל, וטכנולוגיה שנראית מיליון דולר.
                    </p>

                    <div className="pt-8 flex flex-col items-center gap-4">
                        <Link
                            href="/booking"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#007AFF] text-white rounded-full font-bold text-xl shadow-[0_0_50px_-10px_rgba(0,122,255,0.4)] hover:shadow-[0_0_80px_-10px_rgba(0,122,255,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            <span>לקביעת תור</span>
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-sm text-neutral-600">אין צורך בהרשמה • הזמנה מיידית</p>
                    </div>
                </div>
            </section>

            {/* 3. Social Proof / Stats (Glass Cards) */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "לקוחות מרוצים", value: "500+", desc: "דירוג 5.0 כוכבים בגוגל" },
                        { label: "שנות ניסיון", value: "8", desc: "התמחות בדירוגים וזקנים" },
                        { label: "מוצרים מובילים", value: "PREMIUM", desc: "שימוש במותגי על בלבד" }
                    ].map((stat, i) => (
                        <div key={i} className="group p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
                            <div className="text-5xl font-bold text-white mb-3 group-hover:text-[#007AFF] transition-colors">{stat.value}</div>
                            <div className="text-lg font-medium text-white mb-1">{stat.label}</div>
                            <div className="text-sm text-neutral-500">{stat.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Trends Section (Insights) */}
            <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-[#050505] to-black">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#007AFF]">
                                <TrendingUp className="w-6 h-6" />
                                <span className="font-bold tracking-widest text-sm uppercase">Insights</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">מגזין הספרות</h2>
                        </div>
                        <button className="hidden md:block text-neutral-400 hover:text-white transition-colors">
                            לכל הכתבות
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {insights.length > 0 ? (
                            insights.map((insight: any) => (
                                <a
                                    key={insight.id}
                                    href={insight.source_url}
                                    target="_blank"
                                    className="group flex flex-col h-full p-8 rounded-[32px] bg-[#0A0A0A] border border-white/5 hover:border-[#007AFF]/30 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            <span>{insight.source_name}</span>
                                            <span>{new Date(insight.published_at).toLocaleDateString("he-IL")}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#007AFF] transition-colors leading-tight">
                                            {insight.title}
                                        </h3>

                                        <p className="text-neutral-400 leading-relaxed flex-1">
                                            {insight.summary}
                                        </p>

                                        <div className="mt-8 flex items-center gap-2 text-[#007AFF] font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            קרא עוד <ArrowLeft className="w-4 h-4" />
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="col-span-2 py-24 text-center">
                                <div className="inline-block p-4 rounded-full bg-white/5 mb-4 animate-pulse">
                                    <TrendingUp className="w-8 h-8 text-neutral-500" />
                                </div>
                                <p className="text-neutral-500">טוען עדכונים אחרונים...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
                    <Scissors className="w-4 h-4" />
                    <span className="font-bold">BookBiz</span>
                </div>
                <p className="text-xs text-neutral-600">© 2026 כל הזכויות שמורות. נבנה באמצעות טכנולוגיית BookBiz.</p>
            </footer>

        </div>
    );
}
