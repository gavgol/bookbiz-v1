import { ClientsTable } from "@/components/admin/ClientsTable";

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">לקוחות</h1>
                <button className="px-4 py-2 bg-[#007AFF] text-white rounded-lg text-sm font-medium hover:bg-[#006AD1] transition-colors">
                    הוסף לקוח
                </button>
            </div>

            <ClientsTable />
        </div>
    );
}
