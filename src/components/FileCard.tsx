import React from "react";
import { FiFolder, FiFileText, FiMoreVertical, FiTrash2, FiEdit2, FiAperture, FiArrowLeft } from "react-icons/fi";
import { useFileStore } from "@/hooks/userFileStore";
import { FileNode } from "@/types";
import { COLORS, colorMap } from "@/lib/colors";

interface FileCardProps {
    item: FileNode;
    onClick: (item: FileNode) => void;
    activeDropdownId: string | null;
    setActiveDropdownId: (id: string | null) => void;
    showColorPickerId: string | null;
    setShowColorPickerId: (id: string | null) => void;
    onRename: (item: FileNode) => void;
}

export default function FileCard({
    item,
    onClick,
    activeDropdownId,
    setActiveDropdownId,
    showColorPickerId,
    setShowColorPickerId,
    onRename
}: FileCardProps) {
    const updateFileColor = useFileStore((state) => state.updateFileColor);
    const moveToTrash = useFileStore((state) => state.moveToTrash);

    const colorConfig = item.color && item.color !== "default" ? colorMap[item.color] : null;
    const dynamicBg = colorConfig ? colorConfig.bg : "bg-zinc-800/60";
    const dynamicBorder = colorConfig ? colorConfig.border : "border-zinc-800/80";
    const dynamicHover = colorConfig ? `${colorConfig.hoverBg} ${colorConfig.hoverBorder}` : "hover:bg-zinc-700/70 hover:border-zinc-700/50";

    const dynamicIconBg = colorConfig ? colorConfig.iconBg : (item.type === "folder" ? "bg-emerald-500/10" : "bg-blue-500/10");
    const dynamicIconText = colorConfig ? colorConfig.text : (item.type === "folder" ? "text-emerald-500" : "text-blue-500");
    const dynamicIconFill = colorConfig ? colorConfig.fill : (item.type === "folder" ? "fill-emerald-500/10" : "fill-blue-500/10");

    return (
        <div
            onClick={() => onClick(item)}
            className={`group relative border ${dynamicBorder} ${dynamicBg} ${dynamicHover} p-2 rounded-lg transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between`}
        >
            <div className="flex items-center gap-3 w-full min-w-0">
                {item.type === "folder" ? (
                    <div className={`w-12 h-12 rounded-xl ${dynamicIconBg} flex items-center justify-center ${dynamicIconText} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                        <FiFolder className={`w-6 h-6 ${dynamicIconFill}`} />
                    </div>
                ) : (
                    <div className={`w-12 h-12 rounded-xl ${dynamicIconBg} flex items-center justify-center ${dynamicIconText} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                        <FiFileText className={`w-6 h-6 ${dynamicIconFill}`} />
                    </div>
                )}
                <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors flex-1 min-w-0 pr-6">
                    {item.name}
                </h3>
                
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                        setShowColorPickerId(null);
                    }}
                    className="absolute top-3 right-2 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700/50 rounded-md transition-colors cursor-pointer"
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
                                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
                                            className={`w-5 h-5 rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-transform ${color.hexBg} relative flex items-center justify-center cursor-pointer`}
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
                                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                    <FiAperture className="w-3.5 h-3.5" />
                                    Color
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRename(item);
                                        setActiveDropdownId(null);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
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
                                    className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors cursor-pointer"
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
}
