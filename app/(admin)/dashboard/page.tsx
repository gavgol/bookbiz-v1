import { Users, CreditCard, Calendar } from "lucide-react";

const STATS = [
    {
        label: "תורים היום",
        value: "12",
        trend: "+2 מהאתמול",
        icon: Calendar,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        label: "לקוחות חדשים",
        value: "3",
        trend: "השבוע",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        label: "הכנסה חודשית",
        value: "₪15,200",
        trend: "+12% מחודש שעבר",
        icon: CreditCard,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">

            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">בוקר טוב, אוראל 👋</h1>
                <p className="text-neutral-400 mt-1">הנה מה שקורה בעסק שלך היום.</p>
            </div>

            {/* Quick Stats Widget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STATS.map((stat, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-neutral-400 group-hover:text-white transition-colors">
                                {stat.trend}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <p className="text-sm text-neutral-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">פעילות אחרונה</h2>
                <div className="h-32 flex items-center justify-center text-neutral-500 text-sm border-2 border-dashed border-white/5 rounded-xl">
                    אין פעילות חדשה כרגע
                </div>
            </div>

        </div>
    );
}
