export const COLORS = [
    { id: "default", name: "Default", hexBg: "bg-zinc-600" },
    { id: "red", name: "Red", hexBg: "bg-red-500" },
    { id: "orange", name: "Orange", hexBg: "bg-orange-500" },
    { id: "amber", name: "Amber", hexBg: "bg-amber-500" },
    { id: "emerald", name: "Emerald", hexBg: "bg-emerald-500" },
    { id: "teal", name: "Teal", hexBg: "bg-teal-500" },
    { id: "blue", name: "Blue", hexBg: "bg-blue-500" },
    { id: "indigo", name: "Indigo", hexBg: "bg-indigo-500" },
    { id: "violet", name: "Violet", hexBg: "bg-violet-500" },
    { id: "pink", name: "Pink", hexBg: "bg-pink-500" }
];

export const colorMap: Record<string, { bg: string; border: string; hoverBg: string; hoverBorder: string; iconBg: string; text: string; fill: string }> = {
    red: {
        bg: "bg-red-950/20",
        border: "border-red-900/40",
        hoverBg: "hover:bg-red-900/30",
        hoverBorder: "hover:border-red-700/50",
        iconBg: "bg-red-500/15",
        text: "text-red-400",
        fill: "fill-red-500/10"
    },
    orange: {
        bg: "bg-orange-950/20",
        border: "border-orange-900/40",
        hoverBg: "hover:bg-orange-900/30",
        hoverBorder: "hover:border-orange-700/50",
        iconBg: "bg-orange-500/15",
        text: "text-orange-400",
        fill: "fill-orange-500/10"
    },
    amber: {
        bg: "bg-amber-950/15",
        border: "border-amber-900/40",
        hoverBg: "hover:bg-amber-900/25",
        hoverBorder: "hover:border-amber-700/50",
        iconBg: "bg-amber-500/15",
        text: "text-amber-400",
        fill: "fill-amber-500/10"
    },
    emerald: {
        bg: "bg-emerald-950/20",
        border: "border-emerald-900/40",
        hoverBg: "hover:bg-emerald-900/30",
        hoverBorder: "hover:border-emerald-700/50",
        iconBg: "bg-emerald-500/15",
        text: "text-emerald-400",
        fill: "fill-emerald-500/10"
    },
    teal: {
        bg: "bg-teal-950/20",
        border: "border-teal-900/40",
        hoverBg: "hover:bg-teal-900/30",
        hoverBorder: "hover:border-teal-700/50",
        iconBg: "bg-teal-500/15",
        text: "text-teal-400",
        fill: "fill-teal-500/10"
    },
    blue: {
        bg: "bg-blue-950/20",
        border: "border-blue-900/40",
        hoverBg: "hover:bg-blue-900/30",
        hoverBorder: "hover:border-blue-700/50",
        iconBg: "bg-blue-500/15",
        text: "text-blue-400",
        fill: "fill-blue-500/10"
    },
    indigo: {
        bg: "bg-indigo-950/20",
        border: "border-indigo-900/40",
        hoverBg: "hover:bg-indigo-900/30",
        hoverBorder: "hover:border-indigo-700/50",
        iconBg: "bg-indigo-500/15",
        text: "text-indigo-400",
        fill: "fill-indigo-500/10"
    },
    violet: {
        bg: "bg-violet-950/20",
        border: "border-violet-900/40",
        hoverBg: "hover:bg-violet-900/30",
        hoverBorder: "hover:border-violet-700/50",
        iconBg: "bg-violet-500/15",
        text: "text-violet-400",
        fill: "fill-violet-500/10"
    },
    pink: {
        bg: "bg-pink-950/20",
        border: "border-pink-900/40",
        hoverBg: "hover:bg-pink-900/30",
        hoverBorder: "hover:border-pink-700/50",
        iconBg: "bg-pink-500/15",
        text: "text-pink-400",
        fill: "fill-pink-500/10"
    }
};
