"use client";

import type { ReactNode } from "react";

import { useChat, type ChatCompose } from "@/components/grahak_widget";

// A "talk to us" CTA. Primary action: open the Grahak chat widget. Fallback: the
// plain `href` (a real `mailto:`) which takes over when the widget isn't ready
// (no-JS, still loading, or unconfigured), and keeps right-click "Copy email"
// working either way. Drop-in for an existing `<a href="mailto:…">`: same href,
// same className. Keep the visible email nearby so people always see the address.
// Pass `compose` to open a NEW conversation pre-filled with that message (keep the
// mailto's subject/body the same, so both paths send the same request).
export function ChatLink({
    href = "mailto:hey@ceoshikhar.com",
    className,
    title,
    compose,
    onOpen,
    children,
}: {
    /** The mailto fallback. Keep it a real mailto (subjects are fine) so the
        link degrades gracefully when the widget can't open. */
    href?: string;
    className?: string;
    title?: string;
    compose?: ChatCompose;
    /** Runs on every click with whichever path handles it: the chat widget,
        or the mailto fallback when the widget isn't ready. */
    onOpen?: (via: "chat" | "email") => void;
    children: ReactNode;
}) {
    const { open, ready } = useChat();

    return (
        <a
            href={href}
            title={title}
            className={className}
            onClick={(event) => {
                onOpen?.(ready ? "chat" : "email");
                if (!ready) return; // let the mailto proceed
                event.preventDefault();
                open(compose ? { compose } : undefined);
            }}
        >
            {children}
        </a>
    );
}
