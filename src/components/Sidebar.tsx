"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPlus, FiHome, FiHardDrive, FiClock, FiTrash2 } from "react-icons/fi";

const navLinks = [
    { name: "Home", href: "/drive/home", icon: FiHome },
    { name: "My Drive", href: "/drive/my-drive", icon: FiHardDrive },
    { name: "Recent", href: "/drive/recent", icon: FiClock },
    { name: "Trash", href: "/drive/trash", icon: FiTrash2 }
];


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-66 bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-900 flex flex-col h-full select-none">
            <div className="h-16 flex items-center px-6 border-b border-zinc-900 gap-3">
                <span className="text-xl font-bold tracking-tight text-emerald-400">
                    File Box
                </span>
            </div>

            {/* Main Part */}
            <div className="p-4 flex flex-col gap-6">
                <button className="py-3 px-6 w-fit text-base font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-3 group cursor-pointer">
                    <FiPlus className="w-5 h-5 stroke-[2.5]" />
                    Create
                </button>
                <nav className="flex flex-col gap-1">
                    {navLinks.map((tab) => {
                        const isActive = pathname === tab.href;
                        const Icon = tab.icon;
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`w-full h-10 rounded-lg px-4 flex items-center gap-3.5 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive ? "bg-zinc-800 text-emerald-400 font-semibold" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                                    }`}
                            >
                                <Icon className="w-4.5 h-4.5" />
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {/* Footer */}

            <Link href="/" className="text-base text-zinc-400 mt-auto p-4 border-t border-zinc-900 bg-zinc-800 hover:text-emerald-400 font-semibold transition-colors text-center">
                Exit Box
            </Link>


        </aside>
    );
}
