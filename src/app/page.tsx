"use client"

import Link from "next/link";
import { FaRegFolderOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 font-sans select-none antialiased">
      <div className="relative z-10 max-w-2xl w-full mx-4 p-12 rounded-3xl border border-zinc-800/80 bg-zinc-800/80 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Welcome to{" "}
          <span className="text-emerald-400">
            File Box
          </span>
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mb-10">
          Control your folders & files with File Box
        </p>
        <Link href="/drive">
          <Button
            size="lg"
            className="h-14 px-8 text-base font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
          >
            Open File Box
            <FaRegFolderOpen className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
