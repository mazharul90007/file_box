"use client"
import { useFileStore } from "@/hooks/userFileStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiHome, FiHardDrive, FiClock, FiTrash2, FiFolderPlus, FiFilePlus } from "react-icons/fi";
import InputModal from "./InputModal";


const navLinks = [
    { name: "Home", href: "/drive/home", icon: FiHome },
    { name: "Recent", href: "/drive/recent", icon: FiClock },
    { name: "Trash", href: "/drive/trash", icon: FiTrash2 }
];


export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)
    const addFolder = useFileStore((state) => state.addFolder);
    const addFile = useFileStore((state) => state.addFile);
    const files = useFileStore((state) => state.files);
    const activeFolderId = useFileStore((state) => state.activeFolderId);

    const [modalType, setModalType] = useState<"folder" | "file" | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [modalError, setModalError] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []);

    const handleCreateFolder = () => {
        setInputValue("");
        setModalError(null);
        setModalType("folder");
        setIsOpen(false);
    }

    const handleCreateFile = () => {
        setInputValue("");
        setModalError(null);
        setModalType("file");
        setIsOpen(false);
    }

    const handleModalSubmit = () => {
        if (!inputValue.trim()) return;
        const trimmedName = inputValue.trim();

        const exists = files.some(
            (item) =>
                item.name.toLowerCase() === trimmedName.toLowerCase() &&
                item.parentId === activeFolderId &&
                item.type === modalType &&
                !item.isTrash
        );

        if (exists) {
            setModalError(`A ${modalType} named "${trimmedName}" already exists in this directory.`);
            return;
        }

        if (modalType === "folder") {
            addFolder(trimmedName);
        } else {
            addFile(trimmedName);
        }

        setModalType(null);
    }

    return (
        <aside className="w-66 bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-900 flex flex-col h-full select-none">
            <div className="h-16 flex items-center px-6 border-b border-zinc-900 gap-3">
                <span className="text-xl font-bold tracking-tight text-emerald-400">
                    File Box
                </span>
            </div>

            {/* =======Main Part======== */}
            <div className="p-4 flex flex-col gap-6">
                <div className="relative w-full" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="py-2.5 px-5 w-fit text-base font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                    >
                        <FiPlus className={`w-5 h-5 stroke-[2.5] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                        Create
                    </button>
                    {isOpen && (
                        <div className="absolute top-14 left-0 right-0 bg-zinc-900 rounded-lg shadow-lg border border-zinc-800 z-50">
                            <div className="p-2 flex flex-col gap-1">
                                <button
                                    onClick={handleCreateFolder}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors text-left cursor-pointer"
                                >
                                    <FiFolderPlus className="w-4 h-4 text-emerald-400" />
                                    <span>New Folder</span>
                                </button>
                                <button
                                    onClick={handleCreateFile}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors text-left cursor-pointer"
                                >
                                    <FiFilePlus className="w-4 h-4 text-emerald-400" />
                                    <span>New File</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
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

            <InputModal
                isOpen={modalType !== null}
                onClose={() => setModalType(null)}
                onSubmit={handleModalSubmit}
                title={modalType === "folder" ? "New Folder" : "New File"}
                placeholder={modalType === "folder" ? "Enter folder name" : "Enter file name (e.g. notes.txt)"}
                value={inputValue}
                onChange={(val) => {
                    setInputValue(val);
                    if (modalError) setModalError(null);
                }}
                error={modalError}
            />
        </aside>
    );
}
