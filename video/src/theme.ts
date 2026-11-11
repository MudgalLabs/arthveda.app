// Arthveda's dark theme, lifted from web/src/index.css so the rebuilt UI reads
// as the real app. Money is the only thing that gets green/red.

export const C = {
    bg0: "hsl(220, 39%, 5%)", // app background / sidebar
    bg1: "hsl(223, 48%, 8%)", // main content
    bg2: "hsl(224, 44%, 12%)", // cards
    bg3: "hsl(225, 40%, 16%)", // popovers
    bg4: "hsl(226, 36%, 20%)",
    stage: "#04060d", // the void around the panels
    borderSubtle: "hsl(220, 35%, 24%)",
    borderSoft: "hsl(220, 35%, 28%)",
    borderHover: "hsl(220, 35%, 40%)",
    primary: "hsl(226, 51%, 45%)",
    primaryHover: "hsl(226, 51%, 49%)",
    secondary: "hsl(222, 42%, 20%)",
    secondaryHover: "hsl(222, 42%, 24%)",
    text: "hsl(210, 40%, 98%)",
    textMuted: "hsl(213, 30%, 70%)",
    textSubtle: "hsl(215, 15%, 50%)",
    placeholder: "hsl(215, 13%, 45%)",
    link: "hsl(213, 59%, 59%)",
    success: "hsl(158, 64%, 50%)",
    destructive: "hsl(1, 100%, 73%)",
    chartUp: "#22c55e",
    chartDown: "#ef4444",
    chartUpMuted: "rgba(34, 197, 94, 0.5)",
    chartDownMuted: "rgba(239, 68, 68, 0.5)",
    profit: "hsl(150, 48%, 42%)",
    loss: "hsl(357, 55%, 52%)",
    successBg: "rgba(73, 224, 136, 0.08)",
    successBorder: "rgba(73, 224, 136, 0.16)",
    errorBg: "rgba(255, 107, 107, 0.09)",
    errorBorder: "rgba(255, 107, 107, 0.16)",
    logo: "#7CA6D8",
    azure400: "hsl(213, 67%, 69%)",
    azure500: "hsl(213, 59%, 59%)",
    azure600: "hsl(220, 54%, 54%)",
    equity: "#3178c6",
    option: "#8957e5",
    future: "#c6538c",
    // The thread: one luminous line that carries the idea through every screen.
    threadCore: "#e6efff",
    thread: "#8fb6ff",
    threadGlow: "#3f7bff",
};

export const F = {
    ui: "Inter, system-ui, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
    logo: "'Museo Sans', Inter, sans-serif",
};

/** Brand gradient used on the second line of every title (the app's "OS"). */
export const BRAND_GRADIENT = "linear-gradient(180deg, #9cc3f2 0%, #6f9be0 45%, #4a6fd0 100%)";
