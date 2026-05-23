export interface FileNode {
    id: string;
    name: string;
    type: 'folder' | 'file';
    parentId: string | null;
    content?: string;
    isTrash: boolean;
    createdAt: string;
    updatedAt: string;
    color?: string;
}
export type TabType = 'home' | 'mydrive' | 'recent' | 'trash';
