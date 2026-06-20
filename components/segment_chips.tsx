import { Check } from "lucide-react";

import type { BrokerSegment, SegmentLabel } from "@/lib/brokers";
import { cn } from "@/lib/utils";
import { Tag } from "@/ui/tag";

export const CONTACT_EMAIL = "hey@arthveda.app";

// The underlyings each segment covers. Centralized (keyed by the closed
// SegmentLabel set) so every chip for the same segment reads identically across
// all brokers and both the hub cards and broker pages.
export const SEGMENT_DETAIL: Record<SegmentLabel, string> = {
    Cash: "stocks, etfs",
    "F&O": "index, stocks, commodity",
    Options: "index, stocks, commodity",
    Futures: "index, stocks, commodity",
};

// Chips that show, at a glance, which trading segments a broker's import covers
// and how the rest get into the journal:
//   supported  — parsed straight from the broker's export (success + check)
//   manual     — broker can't export it, so log it by hand (muted)
//   on-request — we can build the parser if you share an export (link, emails)
// Driven entirely by `broker.segments` so every broker page and the /brokers
// hub stay consistent. See lib/brokers.ts.
export function SegmentChips({
    segments,
    size = "default",
    className,
}: {
    segments: BrokerSegment[];
    size?: "default" | "small";
    className?: string;
}) {
    return (
        <ul
            className={cn("flex flex-wrap items-center gap-2", className)}
            aria-label="Supported trading segments"
        >
            {segments.map((segment) => (
                <li key={segment.label} className="max-w-full">
                    <SegmentChip segment={segment} size={size} />
                </li>
            ))}
        </ul>
    );
}

function SegmentChip({
    segment,
    size,
}: {
    segment: BrokerSegment;
    size: "default" | "small";
}) {
    const { label, state } = segment;
    const iconSize = size === "small" ? 12 : 14;

    // Underlyings clarify what a segment we actually ingest covers. On-request
    // segments aren't built yet, so listing sub-categories there is just noise.
    const body = (
        <span>
            {label}
            {state !== "on-request" && (
                <span className="opacity-70"> · {SEGMENT_DETAIL[label]}</span>
            )}
            {state === "manual" && " · log manually"}
            {state === "on-request" && " · on request"}
        </span>
    );

    // Shared so wrapped chips on narrow hub cards stay readable (left-aligned,
    // never wider than the card) instead of overflowing.
    const wrap = "max-w-full justify-start whitespace-normal text-left";

    if (state === "supported") {
        return (
            <Tag variant="success" size={size} className={cn(wrap, "gap-1.5")}>
                <Check size={iconSize} aria-hidden className="mt-0.5 shrink-0 self-start" />
                {body}
            </Tag>
        );
    }

    if (state === "manual") {
        return (
            <Tag variant="muted" size={size} className={wrap}>
                {body}
            </Tag>
        );
    }

    // on-request: clickable, emails us with a prefilled subject. The base Tag
    // has no "link" variant (it's kept in sync with the app's s8ly/tag), so the
    // link look comes from a className override on the default variant.
    return (
        <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Import support: ${label}`)}`}
            title={`Email us a sample export and we'll add ${label} import support`}
            className="inline-flex max-w-full no-underline"
        >
            <Tag
                size={size}
                className={cn(wrap, "text-link transition-colors hover:text-text-primary")}
            >
                {body}
            </Tag>
        </a>
    );
}
