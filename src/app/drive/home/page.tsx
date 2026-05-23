"use client"
import { useEffect, useState } from "react";
import { useFileStore } from "@/hooks/userFileStore";
import { FiFolder, FiFileText } from "react-icons/fi";

export default function HomePage() {
    const files = useFileStore((state) => state.files);
    const [mounted, setMounted] = useState(false);

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

    const rootItems = files.filter(item => !item.parentId && !item.isTrash);

    return (
        <div className="p-8 flex flex-col gap-6 select-none">
            <div>
                <h1 className="text-2xl font-bold text-white">Home Workspace</h1>
            </div>

            {rootItems.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    No folders or files created yet. Click "Create" in the sidebar to start!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {rootItems.map((item) => (
                        <div
                            key={item.id}
                            className="group border border-zinc-800/80 bg-zinc-800/60 hover:bg-zinc-700/70 hover:border-zinc-700/50 p-2 rounded-lg transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between"
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
                                <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors flex-1 min-w-0">
                                    {item.name}
                                </h3>
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
        </div>
    );
}
