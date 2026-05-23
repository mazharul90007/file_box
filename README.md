<p align="center">
  <a href="https://filebox-two.vercel.app" target="blank"><img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1779528329/file_box_r2f2td.png" width="100" alt="File Box Logo" /></a>
</p>

<p align="center">A premium cloud workspace UI for organizing files and documents, featuring global search, dynamic color themes, and soft-delete trash bins.</p>

# FILE BOX

**FILE BOX** is a responsive, modern Next.js frontend built for managing files and folders. It provides an intuitive, Google Drive-like experience where users can seamlessly create, customize, and organize their directories with dynamic color tagging, instant search filtering, and state persistence.

🌐 **Frontend Live URL:** [https://filebox-two.vercel.app](https://filebox-two.vercel.app)  
🌐 **Frontend GitHub:** [https://github.com/mazharul90007/file_box](https://github.com/mazharul90007/file_box)  

---

## ✨ Features

### 📁 Core File Management
- **Workspaces & Directories**: Create unlimited nested folders and dummy text files. Click into folders to navigate seamlessly through the directory tree.
- **Rename & Organize**: Instantly rename any file or folder using a seamless modal interface, preventing duplicate names in the same directory.
- **Dynamic Color Coding**: Customize the background color of any file or folder card from a curated palette of 10 modern colors, creating a visually organized and premium aesthetic.

### 🔍 Search & Discovery
- **Instant Global Search**: Start typing in the header to instantly filter and display matching files and folders globally from across your entire workspace.
- **Recent View**: A dedicated "Recent" page that dynamically tracks active files, sorted automatically by their most recent modification date.

### 🗑️ Soft Deletion & Recovery
- **Move to Trash**: Instead of immediate permanent deletion, items are moved to the Trash Bin.
- **Trash Bin**: Review deleted items. Choose to **Restore** them back to their original workspace locations, or **Delete Permanently**.
- **Cascade Deletion**: Moving a folder to the trash cascades the action to all nested contents inside it.

### 💻 Tech Stack
- **Next.js 15 (App Router)** & **React 19**
- **Tailwind CSS v4** for styling and premium glassmorphic UI elements
- **Zustand** for complex state management and `localStorage` persistence
- **React Icons (Feather)** for modern, crisp SVG iconography
