"use client";

import { GrahakProvider } from "@grahak/react";
import { MessageCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";

// Grahak is our customer-conversation tool. The app (arthveda.app) embeds it
// in "attach" mode for logged-in users, minting a signed identity JWT per
// visitor. Here on the marketing site every visitor is anonymous, so we run
// Grahak in "overlay" mode with `anonymous`: it owns a floating bottom-right
// launcher, and the SDK mints a throwaway identity from the projectId alone —
// no backend, no JWT, no signing key. The project must have anonymous
// conversations enabled in the Grahak console for the anon endpoint to answer.
//
// GRAHAK_PROJECT_ID is public (it rides in the widget iframe URL). Unset ⇒ the
// widget is off — that's how it stays dark in local dev / previews without the
// env var, mirroring how PostHog only boots when its key is present.
const GRAHAK_PROJECT_ID = process.env.NEXT_PUBLIC_GRAHAK_PROJECT_ID;

// Our own launcher instead of Grahak's default dark FAB, so the button reads as
// Arthveda: the `primary` button from our design system (bg-primary +
// hover:bg-primary-hover, foreground text, focus ring) shaped into a circular
// FAB. Grahak suppresses its built-in button and docks this into its fixed
// corner slot, re-rendering it with live state — so we only style; positioning
// is Grahak's job. Closed → chat glyph; open → close (X); an unread count (team
// replied while the panel was shut) shows a badge.
function GrahakLauncher({
    isOpen,
    unreadCount,
    toggle,
}: {
    isOpen: boolean;
    unreadCount: number;
    toggle: () => void;
}) {
    const hasUnread = !isOpen && unreadCount > 0;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={
                isOpen
                    ? "Close chat"
                    : hasUnread
                      ? `Open chat, ${unreadCount} unread`
                      : "Open chat"
            }
            className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full",
                "border border-transparent bg-primary text-foreground",
                "shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
                "transition-[background-color,transform] duration-200 ease-out",
                "hover:bg-primary-hover active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
            )}
        >
            {/* Both glyphs stacked; crossfade + rotate on open/close. */}
            <span className="relative flex h-6 w-6 items-center justify-center">
                <MessageCircle
                    className={cn(
                        "absolute h-6 w-6 transition-all duration-200",
                        isOpen
                            ? "rotate-90 scale-50 opacity-0"
                            : "rotate-0 scale-100 opacity-100",
                    )}
                />
                <X
                    className={cn(
                        "absolute h-6 w-6 transition-all duration-200",
                        isOpen
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-50 opacity-0",
                    )}
                />
            </span>

            {hasUnread && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f43f5e] px-1 text-[11px] font-semibold leading-none text-white ring-2 ring-background">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}
        </button>
    );
}

export default function GrahakWidget() {
    if (!GRAHAK_PROJECT_ID) return null;

    // Solid dark site (bg #05070f) — pin the widget to dark. Overlay renders
    // its own portal, so this component's position in the tree doesn't affect
    // where the launcher appears.
    return (
        <GrahakProvider
            projectId={GRAHAK_PROJECT_ID}
            mode="overlay"
            anonymous
            theme="dark"
            launcher={({ isOpen, unreadCount, toggle }) => (
                <GrahakLauncher
                    isOpen={isOpen}
                    unreadCount={unreadCount}
                    toggle={toggle}
                />
            )}
        />
    );
}
