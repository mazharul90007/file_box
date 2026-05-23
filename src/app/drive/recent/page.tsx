"use client"
import React, { useEffect, useState } from "react";
import { useFileStore } from "@/hooks/userFileStore";
import { FiFolder, FiFileText, FiArrowLeft, FiMoreVertical, FiTrash2, FiEdit2, FiAperture } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FileNode } from "@/types";
import TextEditor from "@/components/TextEditor";
import InputModal from "@/components/InputModal";

const COLORS = [
    { id: "default", name: "Default", hexBg: "bg-zinc-600" },
    { id: "red", name: "Red", hexBg: "bg-red-500" },
    { id: "orange", name: "Orange", hexBg: "bg-orange-500" },
    { id: "amber", name: "Amber", hexBg: "bg-amber-500" },
    { id: "emerald", name: "Emerald", hexBg: "bg-emerald-500" },
    { id: "teal", name: "Teal", hexBg: "bg-teal-500" },
    { id: "blue", name: "Blue", hexBg: "bg-blue-500" },
    { id: "indigo", name: "Indigo", hexBg: "bg-indigo-500" },
    { id: "violet", name: "Violet", hexBg: "bg-violet-500" },
    { id: "pink", name: "Pink", hexBg: "bg-pink-500" }
];

const colorMap: Record<string, { bg: string; border: string; hoverBg: string; hoverBorder: string; iconBg: string; text: string; fill: string }> = {
    red: {
        bg: "bg-red-950/20",
        border: "border-red-900/40",
        hoverBg: "hover:bg-red-900/30",
        hoverBorder: "hover:border-red-700/50",
        iconBg: "bg-red-500/15",
        text: "text-red-400",
        fill: "fill-red-500/10"
    },
    orange: {
        bg: "bg-orange-950/20",
        border: "border-orange-900/40",
        hoverBg: "hover:bg-orange-900/30",
        hoverBorder: "hover:border-orange-700/50",
        iconBg: "bg-orange-500/15",
        text: "text-orange-400",
        fill: "fill-orange-500/10"
    },
    amber: {
        bg: "bg-amber-950/15",
        border: "border-amber-900/40",
        hoverBg: "hover:bg-amber-900/25",
        hoverBorder: "hover:border-amber-700/50",
        iconBg: "bg-amber-500/15",
        text: "text-amber-400",
        fill: "fill-amber-500/10"
    },
    emerald: {
        bg: "bg-emerald-950/20",
        border: "border-emerald-900/40",
        hoverBg: "hover:bg-emerald-900/30",
        hoverBorder: "hover:border-emerald-700/50",
        iconBg: "bg-emerald-500/15",
        text: "text-emerald-400",
        fill: "fill-emerald-500/10"
    },
    teal: {
        bg: "bg-teal-950/20",
        border: "border-teal-900/40",
        hoverBg: "hover:bg-teal-900/30",
        hoverBorder: "hover:border-teal-700/50",
        iconBg: "bg-teal-500/15",
        text: "text-teal-400",
        fill: "fill-teal-500/10"
    },
    blue: {
        bg: "bg-blue-950/20",
        border: "border-blue-900/40",
        hoverBg: "hover:bg-blue-900/30",
        hoverBorder: "hover:border-blue-700/50",
        iconBg: "bg-blue-500/15",
        text: "text-blue-400",
        fill: "fill-blue-500/10"
    },
    indigo: {
        bg: "bg-indigo-950/20",
        border: "border-indigo-900/40",
        hoverBg: "hover:bg-indigo-900/30",
        hoverBorder: "hover:border-indigo-700/50",
        iconBg: "bg-indigo-500/15",
        text: "text-indigo-400",
        fill: "fill-indigo-500/10"
    },
    violet: {
        bg: "bg-violet-950/20",
        border: "border-violet-900/40",
        hoverBg: "hover:bg-violet-900/30",
        hoverBorder: "hover:border-violet-700/50",
        iconBg: "bg-violet-500/15",
        text: "text-violet-400",
        fill: "fill-violet-500/10"
    },
    pink: {
        bg: "bg-pink-950/20",
        border: "border-pink-900/40",
        hoverBg: "hover:bg-pink-900/30",
        hoverBorder: "hover:border-pink-700/50",
        iconBg: "bg-pink-500/15",
        text: "text-pink-400",
        fill: "fill-pink-500/10"
    }
};

export default function RecentPage() {
    const files = useFileStore((state) => state.files);
    const renameFile = useFileStore((state) => state.renameFile);
    const updateFileColor = useFileStore((state) => state.updateFileColor);
    const moveToTrash = useFileStore((state) => state.moveToTrash);
    const searchQuery = useFileStore((state) => state.searchQuery);

    const [mounted, setMounted] = useState(false);
    const [editingFile, setEditingFile] = useState<FileNode | null>(null);
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
    
    // Rename States
    const [renamingItem, setRenamingItem] = useState<FileNode | null>(null);
    const [renameValue, setRenameValue] = useState("");
    const [renameError, setRenameError] = useState<string | null>(null);

    // Color Selector State
    const [showColorPickerId, setShowColorPickerId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdownId(null);
            setShowColorPickerId(null);
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-8 text-white select-none animate-pulse">
                Loading workspace...
            </div>
        );
    }

    // Filter active files (non-trash) and sort by updatedAt desc
    const currentItems = files
        .filter((item) => {
            if (item.type !== "file" || item.isTrash) return false;
            if (searchQuery.trim() && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const handleItemClick = (item: any) => {
        setEditingFile(item);
    };

    const handleRenameSubmit = () => {
        if (!renameValue.trim() || !renamingItem) return;
        const trimmedName = renameValue.trim();

        // Validation
        const exists = files.some(
            (item) =>
                item.id !== renamingItem.id &&
                item.name.toLowerCase() === trimmedName.toLowerCase() &&
                item.parentId === renamingItem.parentId &&
                item.type === renamingItem.type &&
                !item.isTrash
        );

        if (exists) {
            setRenameError(`A file named "${trimmedName}" already exists in the same folder.`);
            return;
        }

        renameFile(renamingItem.id, trimmedName);
        setRenamingItem(null);
    };

    return (
        <div className="p-8 flex flex-col gap-6 select-none">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">
                    Recent Files
                </h1>
            </div>

            {currentItems.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    No recent files to show. Start by creating a text file in your workspace!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentItems.map((item) => {
                        const colorConfig = item.color && item.color !== "default" ? colorMap[item.color] : null;
                        const dynamicBg = colorConfig ? colorConfig.bg : "bg-zinc-800/60";
                        const dynamicBorder = colorConfig ? colorConfig.border : "border-zinc-800/80";
                        const dynamicHover = colorConfig ? `${colorConfig.hoverBg} ${colorConfig.hoverBorder}` : "hover:bg-zinc-700/70 hover:border-zinc-700/50";

                        const dynamicIconBg = colorConfig ? colorConfig.iconBg : "bg-blue-500/10";
                        const dynamicIconText = colorConfig ? colorConfig.text : "text-blue-500";
                        const dynamicIconFill = colorConfig ? colorConfig.fill : "fill-blue-500/10";

                        return (
                            <div
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className={`group relative border ${dynamicBorder} ${dynamicBg} ${dynamicHover} p-2 rounded-lg transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between`}
                            >
                                <div className="flex items-center gap-3 w-full min-w-0">
                                    <div className={`w-12 h-12 rounded-xl ${dynamicIconBg} flex items-center justify-center ${dynamicIconText} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                                        <FiFileText className={`w-6 h-6 ${dynamicIconFill}`} />
                                    </div>
                                    <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors flex-1 min-w-0 pr-6">
                                        {item.name}
                                    </h3>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                                            setShowColorPickerId(null);
                                        }}
                                        className="absolute top-3 right-2 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700/50 rounded-md transition-colors"
                                    >
                                        <FiMoreVertical className="w-4 h-4" />
                                    </button>

                                    {activeDropdownId === item.id && (
                                        <div className="absolute top-10 right-2 z-50 w-38 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 animate-in zoom-in-95 duration-100">
                                            {showColorPickerId === item.id ? (
                                                <div className="p-2">
                                                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-zinc-800">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowColorPickerId(null);
                                                            }}
                                                            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                                                        >
                                                            <FiArrowLeft className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Select Color</span>
                                                    </div>
                                                    <div className="grid grid-cols-5 gap-1.5 justify-items-center px-0.5">
                                                        {COLORS.map((color) => (
                                                            <button
                                                                key={color.id}
                                                                title={color.name}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateFileColor(item.id, color.id === "default" ? undefined : color.id);
                                                                    setActiveDropdownId(null);
                                                                    setShowColorPickerId(null);
                                                                }}
                                                                className={`w-5 h-5 rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-transform ${color.hexBg} relative flex items-center justify-center`}
                                                            >
                                                                {((item.color || "default") === color.id) && (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowColorPickerId(item.id);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors"
                                                    >
                                                        <FiAperture className="w-3.5 h-3.5" />
                                                        Color
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setRenamingItem(item);
                                                            setRenameValue(item.name);
                                                            setRenameError(null);
                                                            setActiveDropdownId(null);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors"
                                                    >
                                                        <FiEdit2 className="w-3.5 h-3.5" />
                                                        Rename
                                                    </button>
                                                    <div className="h-px w-full bg-zinc-800 my-1" />
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            moveToTrash(item.id);
                                                            setActiveDropdownId(null);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                                                    >
                                                        <FiTrash2 className="w-3.5 h-3.5" />
                                                        Move to Trash
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between mt-1 text-[10px] font-medium text-zinc-500">
                                        <span className="capitalize">{item.type}</span>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {editingFile && (
                <TextEditor file={editingFile} onClose={() => setEditingFile(null)} />
            )}

            <InputModal 
                isOpen={renamingItem !== null}
                onClose={() => setRenamingItem(null)}
                onSubmit={handleRenameSubmit}
                title={`Rename File`}
                placeholder="Enter new name"
                value={renameValue}
                onChange={(val) => {
                    setRenameValue(val);
                    if (renameError) setRenameError(null);
                }}
                error={renameError}
                submitText="Rename"
            />
        </div>
    );
}
