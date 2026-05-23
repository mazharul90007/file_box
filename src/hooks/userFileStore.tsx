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
    updateFileContent: (id: string, content: string) => void;
    updateFileColor: (id: string, color: string | undefined) => void;
    moveToTrash: (id: string) => void;
    restoreFile: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const getDescendantIds = (files: FileNode[], targetId: string): string[] => {
    let ids = [targetId];
    const children = files.filter(f => f.parentId === targetId);
    for (const child of children) {
        ids = ids.concat(getDescendantIds(files, child.id));
    }
    return ids;
};

export const useFileStore = create<FileStoreState>()(
    persist(
        (set) => ({
            files: [],
            activeFolderId: null,
            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),
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
            deleteFile: (id: string) => set((state) => {
                const idsToDelete = getDescendantIds(state.files, id);
                return { files: state.files.filter((f) => !idsToDelete.includes(f.id)) };
            }),
            renameFile: (id: string, name: string) => set((state) => ({
                files: state.files.map((f) => f.id === id ? { ...f, name, updatedAt: new Date().toISOString() } : f)
            })),
            updateFileContent: (id: string, content: string) => set((state) => ({
                files: state.files.map((f) => f.id === id ? { ...f, content, updatedAt: new Date().toISOString() } : f)
            })),
            updateFileColor: (id: string, color: string | undefined) => set((state) => ({
                files: state.files.map((f) => f.id === id ? { ...f, color, updatedAt: new Date().toISOString() } : f)
            })),
            moveToTrash: (id: string) => set((state) => {
                const idsToTrash = getDescendantIds(state.files, id);
                return {
                    files: state.files.map((f) =>
                        idsToTrash.includes(f.id) ? { ...f, isTrash: true, updatedAt: new Date().toISOString() } : f
                    )
                };
            }),
            restoreFile: (id: string) => set((state) => {
                const idsToRestore = getDescendantIds(state.files, id);
                return {
                    files: state.files.map((f) =>
                        idsToRestore.includes(f.id) ? { ...f, isTrash: false, updatedAt: new Date().toISOString() } : f
                    )
                };
            })


        }),
        {
            name: "file-box-storage"
        }
    )

)