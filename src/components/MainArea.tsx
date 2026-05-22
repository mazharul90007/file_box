import { FiFolder, FiFileText, FiChevronRight, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function MainArea() {
    // Static Mock files and folders
    const mockItems = [
        { id: "1", name: "Documents", type: "folder", size: "2 folders", date: "May 22, 2026" },
        { id: "2", name: "Designs", type: "folder", size: "0 folders", date: "May 22, 2026" },
        { id: "3", name: "instructions.txt", type: "file", size: "1.2 KB", date: "May 22, 2026" },
        { id: "4", name: "todo.txt", type: "file", size: "240 bytes", date: "May 22, 2026" }
    ];

    return (
        <section className="flex-1 p-8 overflow-y-auto bg-zinc-950 flex flex-col gap-6">

            {/* 1. Breadcrumbs Navigator Mock */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest select-none">
                <span className="hover:text-white cursor-pointer transition-colors">My Drive</span>
                <FiChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-emerald-400 font-bold">Documents</span>
            </div>

            {/* 2. Heading Section */}
            <div className="flex items-end justify-between border-b border-zinc-900 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Documents</h2>
                    <p className="text-sm text-zinc-500 mt-1">Manage files and folders inside this directory.</p>
                </div>
                <div className="text-xs font-semibold text-zinc-500 uppercase select-none">
                    {mockItems.length} items
                </div>
            </div>

            {/* 3. Folder/File Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {mockItems.map((item) => (
                    <div
                        key={item.id}
                        className="group relative border border-zinc-800/80 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-zinc-700/50 p-5 rounded-2xl transition-all duration-300 cursor-pointer shadow-md select-none flex flex-col justify-between h-40"
                    >

                        {/* Header Icon + Action Menu */}
                        <div className="flex items-start justify-between">
                            {item.type === "folder" ? (
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform duration-300">
                                    <FiFolder className="w-6 h-6 fill-emerald-500/10" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform duration-300">
                                    <FiFileText className="w-6 h-6 fill-blue-500/10" />
                                </div>
                            )}

                            {/* Hover Actions Menu (Pencil + Trash) */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    title="Rename"
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    title="Delete"
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Content Title */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors">
                                {item.name}
                            </h3>

                            {/* Extra Details (size, date) */}
                            <div className="flex items-center justify-between mt-1 text-[10px] font-medium text-zinc-500">
                                <span>{item.size}</span>
                                <span>{item.date}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
}
