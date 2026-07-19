"use client";

import posthog from "posthog-js";
import { Button } from "@/ui/button";
import { APP_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

interface GetStartedProps {
    /** Override the label for family-appropriate CTAs (e.g. "Start journaling"). */
    label?: string;
    /** Override the destination (e.g. the Screener for the Discover hub). */
    href?: string;
    /** Stretch the button to fill its container (e.g. inside a pricing card). */
    fullWidth?: boolean;
    /** Defaults to "primary"; use "secondary" for the Free CTA on /pricing. */
    variant?: "primary" | "secondary";
    /** Defaults to "large"; pass "default" inside dense layouts like /pricing. */
    size?: "default" | "large";
    /** Extra properties merged into the "Clicked Get started" event (e.g. the
        plan + billing interval on /pricing) for conversion-funnel segmentation. */
    eventProps?: Record<string, unknown>;
}

// Primary product-level CTA. Filled → no icon, sentence case (plan §5 Copy
// voice). The locked default label is **"Try it free for 14 days"**
// (2026-07-20, replacing "Start for free"): there is no free tier any more, so
// a bare "free" would read as a plan name and set up a nasty surprise at the
// paywall. The duration does the work — it says low-commitment without
// promising a tier we don't sell. Pair it with a "No card required" sub-line
// at the big placements; it does not belong inside the button.
//
// Callers that want this wording shouldn't pass a label at all. Action-specific
// placements override via `label` ("Start your trading journal", "Import my
// Tradebook", "Open the screener", etc.) and are deliberately left alone.
export const GetStarted = ({
    label,
    href,
    fullWidth = false,
    variant = "primary",
    size = "large",
    eventProps,
}: GetStartedProps) => {
    const text = label ?? "Try it free for 14 days";

    return (
        <a
            href={href ?? APP_URL}
            onClick={() => posthog.capture("Clicked Get started", { label: text, ...eventProps })}
            className={cn("unstyled-link", fullWidth && "block w-full")}
        >
            <Button variant={variant} size={size} className={cn(fullWidth && "w-full")}>
                {text}
            </Button>
        </a>
    );
};
