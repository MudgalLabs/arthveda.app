"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";

import { Tooltip } from "@/ui/tooltip";

// The small "(i)" affordance used in dense tables (pricing plans, feature
// matrices) to attach a one-sentence explanation to a row label. Opens on
// **hover** (desktop) AND **tap** (mobile) — Radix's hover handling drives the
// hover side; the button's onClick + an outside-click listener drive tap.
// Tooltip copy lives at the call-site; keep it ≤ ~20 words, plain language.
export function InfoTooltip({
    content,
    label = "More info",
}: {
    content: React.ReactNode;
    /** Accessible name for the icon button. */
    label?: string;
}) {
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);
    const hide = () => setOpen(false);

    // Tap-away to close on touch devices (where there's no "mouse leave").
    useEffect(() => {
        if (!open) return;
        // Defer the listener so the click that opened the tooltip doesn't
        // immediately close it via this same handler.
        const t = setTimeout(() => document.addEventListener("click", hide), 0);
        return () => {
            clearTimeout(t);
            document.removeEventListener("click", hide);
        };
    }, [open]);

    return (
        <Tooltip
            open={open}
            onOpenChange={setOpen}
            content={content}
            contentProps={{ side: "top", sideOffset: 6, collisionPadding: 12 }}
        >
            <button
                type="button"
                aria-label={label}
                aria-expanded={open}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                onClick={(e) => {
                    e.stopPropagation();
                    show();
                }}
                className="inline-flex translate-y-px items-center text-text-subtle transition-colors hover:text-text-muted focus:outline-none focus-visible:text-text-muted"
            >
                <Info size={13} aria-hidden />
            </button>
        </Tooltip>
    );
}
