"use client"
import React, { useState } from "react";
import { FileNode } from "@/types";
import { useFileStore } from "@/hooks/userFileStore";
import { FiX, FiSave } from "react-icons/fi";

interface TextEditorProps {
    file: FileNode;
    onClose: () => void;
}

export default function TextEditor({ file, onClose }: TextEditorProps) {
    const updateFileContent = useFileStore((state) => state.updateFileContent);
    const [content, setContent] = useState(file.content || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate a slight delay for premium feel
        setTimeout(() => {
            updateFileContent(file.id, content);
            setIsSaving(false);
            onClose();
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200">
            <div className="flex flex-col w-full max-w-4xl h-full max-h-[80vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="text-emerald-400">Editing:</span> {file.name}
                        </h2>
                        <p className="text-xs text-zinc-500 mt-1">
                            Last updated: {new Date(file.updatedAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            title="Close without saving"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || content === file.content}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg font-medium transition-colors"
                        >
                            <FiSave className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-6 bg-zinc-950">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start typing..."
                        className="w-full h-full bg-transparent text-zinc-300 resize-none outline-none font-mono text-sm sm:text-base leading-relaxed placeholder:text-zinc-700"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
