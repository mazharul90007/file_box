"use client"

import { FiSearch } from "react-icons/fi";
import { useFileStore } from "@/hooks/userFileStore";

export default function Header() {
    const searchQuery = useFileStore((state) => state.searchQuery);
    const setSearchQuery = useFileStore((state) => state.setSearchQuery);

    return (
        <header className="h-16 border-b border-zinc-900 bg-zinc-950 px-8 flex items-center justify-between select-none">
            <div className="flex-1 max-w-xl relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
                    <FiSearch className="w-4 h-4" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files and folders..."
                    className="w-full h-10 pl-11 pr-4 rounded-full border border-zinc-800 bg-zinc-800/70 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                />
            </div>
        </header>
    );
}
