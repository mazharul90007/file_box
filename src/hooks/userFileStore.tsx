import { FileNode } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface FileStoreState {
    files: FileNode[];
    activeFolderId: string | null;
    setActiveFolderId: (id: string | null) => void;
    addFolder: (name: string) => void;
    addFile: (name: string, content?: string) => void;
    deleteFile: (id: string) => void;
    renameFile: (id: string, name: string) => void;
}

export const useFileStore = create<FileStoreState>()(
    persist(
        (set) => ({
            files: [],
            activeFolderId: null,
            setActiveFolderId: (id) => set({ activeFolderId: id }),
            addFolder: (name) =>
                set((state) => {
                    const newFolder: FileNode = {
                        id: crypto.randomUUID(),
                        name,
                        type: 'folder',
                        parentId: state.activeFolderId,
                        isTrash: false,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    return { files: [...state.files, newFolder] }
                }),
            addFile: (name: string, content?: string) => set((state) => {
                const newFile: FileNode = {
                    id: crypto.randomUUID(),
                    name,
                    type: 'file',
                    parentId: state.activeFolderId,
                    content: content || "",
                    isTrash: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                return { files: [...state.files, newFile] }
            }),
            deleteFile: (id: string) => set((state) => ({
                files: state.files.filter((f) => f.id !== id)
            })),
            renameFile: (id: string, name: string) => set((state) => ({
                files: state.files.map((f) => f.id === id ? { ...f, name, updatedAt: new Date().toISOString() } : f)
            }))


        }),
        {
            name: "file-box-storage"
        }
    )

)