"use client";

import posthog from "posthog-js";
import { Button } from "@/ui/button";
import { APP_URL } from "@/lib/links";

interface GetStartedProps {
    shortened?: boolean;
    /** Override the label for family-appropriate CTAs (e.g. "Start journaling"). */
    label?: string;
    /** Override the destination (e.g. the Screener for the Discover hub). */
    href?: string;
}

// Primary product-level CTA. Filled → no icon, sentence case (plan §5 Copy
// voice). `shortened` swaps to the "Start for free" friction-reducer wording.
export const GetStarted = ({ shortened = false, label, href }: GetStartedProps) => {
    const text = label ?? (shortened ? "Start for free" : "Get started");

    return (
        <a
            href={href ?? APP_URL}
            onClick={() => posthog.capture("Clicked Get started", { label: text })}
            className="unstyled-link"
        >
            <Button size="large">{text}</Button>
        </a>
    );
};
