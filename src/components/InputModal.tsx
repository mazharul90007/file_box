"use client"
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface InputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    error: string | null;
    submitText?: string;
}

export default function InputModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    placeholder,
    value,
    onChange,
    error,
    submitText = "Create"
}: InputModalProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && mounted && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, mounted]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={placeholder}
                                className={`w-full bg-zinc-950 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-emerald-500'} rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition-colors`}
                            />
                            {error && (
                                <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!value.trim()}
                                className="px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg transition-colors shadow-lg"
                            >
                                {submitText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
