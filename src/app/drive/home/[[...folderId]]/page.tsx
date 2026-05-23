"use client"
import React, { useEffect, useState, use } from "react";
import { useFileStore } from "@/hooks/userFileStore";
import { FiFolder, FiFileText, FiArrowLeft, FiMoreVertical, FiTrash2, FiEdit2, FiAperture } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FileNode } from "@/types";
import TextEditor from "@/components/TextEditor";

interface PageProps {
    params: Promise<{ folderId?: string[] }>;
}

export default function HomePage({ params }: PageProps) {
    const router = useRouter();

    const resolvedParams = use(params);

    const currentFolderId = resolvedParams.folderId?.[0] || null;

    const files = useFileStore((state) => state.files);
    const setActiveFolderId = useFileStore((state) => state.setActiveFolderId);
    const deleteFile = useFileStore((state) => state.deleteFile);
    const [mounted, setMounted] = useState(false);
    const [editingFile, setEditingFile] = useState<FileNode | null>(null);
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdownId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        setActiveFolderId(currentFolderId);
    }, [currentFolderId, setActiveFolderId]);

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

    const currentItems = files.filter(
        (item) => item.parentId === currentFolderId && !item.isTrash
    );

    const currentFolder = files.find((f) => f.id === currentFolderId);

    const handleItemClick = (item: any) => {
        if (item.type === "folder") {
            router.push(`/drive/home/${item.id}`);
        } else {
            setEditingFile(item);
        }
    };

    return (
        <div className="p-8 flex flex-col gap-6 select-none">
            <div className="flex flex-col gap-2">
                {currentFolderId && (
                    <button
                        onClick={() => {

                            if (currentFolder?.parentId) {
                                router.push(`/drive/home/${currentFolder.parentId}`);
                            } else {
                                router.push("/drive/home");
                            }
                        }}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer w-fit"
                    >
                        <FiArrowLeft className="w-3.5 h-3.5" />
                        Go Back
                    </button>
                )}

                <h1 className="text-2xl font-bold text-white">
                    {currentFolder ? currentFolder.name : "Home Workspace"}
                </h1>
            </div>

            {currentItems.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    No folders or files inside this directory. Click "Create" in the sidebar to start!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="group relative border border-zinc-800/80 bg-zinc-800/60 hover:bg-zinc-700/70 hover:border-zinc-700/50 p-2 rounded-lg transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between"
                        >
                            <div className="flex items-center gap-3 w-full min-w-0">
                                {item.type === "folder" ? (
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform duration-300 shrink-0">
                                        <FiFolder className="w-6 h-6 fill-emerald-500/10" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform duration-300 shrink-0">
                                        <FiFileText className="w-6 h-6 fill-blue-500/10" />
                                    </div>
                                )}
                                <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors flex-1 min-w-0 pr-6">
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
                                    <div className="absolute top-10 right-2 z-50 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 animate-in zoom-in-95 duration-100">
                                        <button 
                                            disabled
                                            className="w-full text-left px-3 py-2 text-xs text-zinc-500 flex items-center gap-2 cursor-not-allowed"
                                        >
                                            <FiAperture className="w-3.5 h-3.5" />
                                            Color
                                        </button>
                                        <button 
                                            disabled
                                            className="w-full text-left px-3 py-2 text-xs text-zinc-500 flex items-center gap-2 cursor-not-allowed"
                                        >
                                            <FiEdit2 className="w-3.5 h-3.5" />
                                            Rename
                                        </button>
                                        <div className="h-px w-full bg-zinc-800 my-1" />
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFile(item.id);
                                                setActiveDropdownId(null);
                                            }}
                                            className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                                        >
                                            <FiTrash2 className="w-3.5 h-3.5" />
                                            Delete
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
                    ))}
                </div>
            )}
            
            {editingFile && (
                <TextEditor file={editingFile} onClose={() => setEditingFile(null)} />
            )}
        </div>
    );
}
