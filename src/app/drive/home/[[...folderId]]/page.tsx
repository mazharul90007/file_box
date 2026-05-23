"use client"
import React, { useEffect, useState, use } from "react";
import { useFileStore } from "@/hooks/userFileStore";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FileNode } from "@/types";
import TextEditor from "@/components/TextEditor";
import InputModal from "@/components/InputModal";
import FileCard from "@/components/FileCard";

interface PageProps {
    params: Promise<{ folderId?: string[] }>;
}

export default function HomePage({ params }: PageProps) {
    const router = useRouter();

    const resolvedParams = use(params);

    const currentFolderId = resolvedParams.folderId?.[0] || null;

    const files = useFileStore((state) => state.files);
    const setActiveFolderId = useFileStore((state) => state.setActiveFolderId);
    const renameFile = useFileStore((state) => state.renameFile);
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

    const handleRenameSubmit = () => {
        if (!renameValue.trim() || !renamingItem) return;
        const trimmedName = renameValue.trim();

        const exists = files.some(
            (item) =>
                item.id !== renamingItem.id &&
                item.name.toLowerCase() === trimmedName.toLowerCase() &&
                item.parentId === currentFolderId &&
                item.type === renamingItem.type &&
                !item.isTrash
        );

        if (exists) {
            setRenameError(`A ${renamingItem.type} named "${trimmedName}" already exists in this directory.`);
            return;
        }

        renameFile(renamingItem.id, trimmedName);
        setRenamingItem(null);
    };

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
        (item) => {
            if (item.isTrash) return false;
            if (searchQuery.trim()) {
                return item.name.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return item.parentId === currentFolderId;
        }
    );

    const currentFolder = files.find((f) => f.id === currentFolderId);

    const handleItemClick = (item: FileNode) => {
        if (item.type === "folder") {
            router.push(`/drive/home/${item.id}`);
        } else {
            setEditingFile(item);
        }
    };

    const handleRenameClick = (item: FileNode) => {
        setRenamingItem(item);
        setRenameValue(item.name);
        setRenameError(null);
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
                    {searchQuery.trim() 
                        ? `Search Results for "${searchQuery}"` 
                        : (currentFolder ? currentFolder.name : "Home Workspace")}
                </h1>
            </div>

            {currentItems.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    No folders or files inside this directory. Click "Create" in the sidebar to start!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentItems.map((item) => (
                        <FileCard
                            key={item.id}
                            item={item}
                            onClick={handleItemClick}
                            activeDropdownId={activeDropdownId}
                            setActiveDropdownId={setActiveDropdownId}
                            showColorPickerId={showColorPickerId}
                            setShowColorPickerId={setShowColorPickerId}
                            onRename={handleRenameClick}
                        />
                    ))}
                </div>
            )}

            {editingFile && (
                <TextEditor file={editingFile} onClose={() => setEditingFile(null)} />
            )}

            <InputModal
                isOpen={renamingItem !== null}
                onClose={() => setRenamingItem(null)}
                onSubmit={handleRenameSubmit}
                title={`Rename ${renamingItem?.type === 'folder' ? 'Folder' : 'File'}`}
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
