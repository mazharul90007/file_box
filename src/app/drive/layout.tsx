import { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "My Drive - File Box",
    description: "A premium cloud workspace for files and documents.",
};

export default function DriveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-50 font-sans antialiased">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950 border-l border-zinc-900">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
