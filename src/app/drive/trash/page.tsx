"use client"
import React, { useEffect, useState } from "react";
import { useFileStore } from "@/hooks/userFileStore";
import { FiFolder, FiFileText, FiMoreVertical, FiTrash2, FiRotateCcw } from "react-icons/fi";
import { FileNode } from "@/types";

const colorMap: Record<string, { bg: string; border: string; iconBg: string; text: string; fill: string }> = {
    red: {
        bg: "bg-red-950/20",
        border: "border-red-900/40",
        iconBg: "bg-red-500/15",
        text: "text-red-400",
        fill: "fill-red-500/10"
    },
    orange: {
        bg: "bg-orange-950/20",
        border: "border-orange-900/40",
        iconBg: "bg-orange-500/15",
        text: "text-orange-400",
        fill: "fill-orange-500/10"
    },
    amber: {
        bg: "bg-amber-950/15",
        border: "border-amber-900/40",
        iconBg: "bg-amber-500/15",
        text: "text-amber-400",
        fill: "fill-amber-500/10"
    },
    emerald: {
        bg: "bg-emerald-950/20",
        border: "border-emerald-900/40",
        iconBg: "bg-emerald-500/15",
        text: "text-emerald-400",
        fill: "fill-emerald-500/10"
    },
    teal: {
        bg: "bg-teal-950/20",
        border: "border-teal-900/40",
        iconBg: "bg-teal-500/15",
        text: "text-teal-400",
        fill: "fill-teal-500/10"
    },
    blue: {
        bg: "bg-blue-950/20",
        border: "border-blue-900/40",
        iconBg: "bg-blue-500/15",
        text: "text-blue-400",
        fill: "fill-blue-500/10"
    },
    indigo: {
        bg: "bg-indigo-950/20",
        border: "border-indigo-900/40",
        iconBg: "bg-indigo-500/15",
        text: "text-indigo-400",
        fill: "fill-indigo-500/10"
    },
    violet: {
        bg: "bg-violet-950/20",
        border: "border-violet-900/40",
        iconBg: "bg-violet-500/15",
        text: "text-violet-400",
        fill: "fill-violet-500/10"
    },
    pink: {
        bg: "bg-pink-950/20",
        border: "border-pink-900/40",
        iconBg: "bg-pink-500/15",
        text: "text-pink-400",
        fill: "fill-pink-500/10"
    }
};

export default function TrashPage() {
    const files = useFileStore((state) => state.files);
    const restoreFile = useFileStore((state) => state.restoreFile);
    const deleteFile = useFileStore((state) => state.deleteFile);
    const searchQuery = useFileStore((state) => state.searchQuery);

    const [mounted, setMounted] = useState(false);
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdownId(null);
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

    // Filter trashed items: show only those whose parents are not in trash
    const currentItems = files.filter((item) => {
        if (!item.isTrash) return false;
        if (searchQuery.trim() && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (item.parentId) {
            const parent = files.find((p) => p.id === item.parentId);
            return !parent || !parent.isTrash;
        }
        return true;
    });

    return (
        <div className="p-8 flex flex-col gap-6 select-none">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-white">
                    Trash Bin
                </h1>
            </div>

            {currentItems.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    Your Trash bin is empty!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentItems.map((item) => {
                        const colorConfig = item.color && item.color !== "default" ? colorMap[item.color] : null;
                        const dynamicBg = colorConfig ? colorConfig.bg : "bg-zinc-800/60";
                        const dynamicBorder = colorConfig ? colorConfig.border : "border-zinc-800/80";

                        const dynamicIconBg = colorConfig ? colorConfig.iconBg : (item.type === "folder" ? "bg-emerald-500/10" : "bg-blue-500/10");
                        const dynamicIconText = colorConfig ? colorConfig.text : (item.type === "folder" ? "text-emerald-500" : "text-blue-500");
                        const dynamicIconFill = colorConfig ? colorConfig.fill : (item.type === "folder" ? "fill-emerald-500/10" : "fill-blue-500/10");

                        return (
                            <div
                                key={item.id}
                                className={`group relative border ${dynamicBorder} ${dynamicBg} p-2 rounded-lg transition-all duration-300 shadow-md flex flex-col justify-between opacity-80 hover:opacity-100`}
                            >
                                <div className="flex items-center gap-3 w-full min-w-0">
                                    {item.type === "folder" ? (
                                        <div className={`w-12 h-12 rounded-xl ${dynamicIconBg} flex items-center justify-center ${dynamicIconText} shrink-0`}>
                                            <FiFolder className={`w-6 h-6 ${dynamicIconFill}`} />
                                        </div>
                                    ) : (
                                        <div className={`w-12 h-12 rounded-xl ${dynamicIconBg} flex items-center justify-center ${dynamicIconText} shrink-0`}>
                                            <FiFileText className={`w-6 h-6 ${dynamicIconFill}`} />
                                        </div>
                                    )}
                                    <h3 className="font-semibold text-zinc-100 text-sm truncate flex-1 min-w-0 pr-6">
                                        {item.name}
                                    </h3>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                                        }}
                                        className="absolute top-3 right-2 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700/50 rounded-md transition-colors"
                                    >
                                        <FiMoreVertical className="w-4 h-4" />
                                    </button>

                                    {activeDropdownId === item.id && (
                                        <div className="absolute top-10 right-2 z-50 w-44 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 animate-in zoom-in-95 duration-100">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    restoreFile(item.id);
                                                    setActiveDropdownId(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors"
                                            >
                                                <FiRotateCcw className="w-3.5 h-3.5" />
                                                Restore
                                            </button>
                                            <div className="h-px w-full bg-zinc-800 my-1" />
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteFile(item.id);
                                                    setActiveDropdownId(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors font-semibold"
                                            >
                                                <FiTrash2 className="w-3.5 h-3.5" />
                                                Delete Permanently
                                            </button>
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
        </div>
    );
}
