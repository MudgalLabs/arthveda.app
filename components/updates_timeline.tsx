"use client";

import Link from "next/link";
import { useState } from "react";

import { Tag } from "@/ui/tag";
import { cn } from "@/lib/utils";
import { type Update, type UpdateKind, formatUpdateDate, kindOf } from "@/lib/updates";

type Filter = "all" | UpdateKind;

const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: "Everything" },
    { id: "release", label: "Releases" },
    { id: "journey", label: "Journey" },
];

// The /updates timeline: releases and journey milestones, newest first, with
// a year marker whenever the year changes. Rendered on the server with every
// entry ("Everything"), so crawlers see the full list; the filter only hides.
export function UpdatesTimeline({ updates }: { updates: Update[] }) {
    const [filter, setFilter] = useState<Filter>("all");
    const shown = filter === "all" ? updates : updates.filter((u) => kindOf(u) === filter);

    let lastYear = "";
    return (
        <>
            <div role="group" aria-label="Show" className="mt-10 flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        type="button"
                        aria-pressed={filter === f.id}
                        onClick={() => setFilter(f.id)}
                        className={cn(
                            "rounded-full border px-3.5 py-1.5 font-content text-[13px] transition-colors",
                            filter === f.id
                                ? "border-accent/60 bg-accent/10 text-text-primary"
                                : "border-white/[0.10] text-text-muted hover:text-text-primary",
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <ol className="mt-10 max-w-3xl border-l border-white/[0.10]">
                {shown.map((u) => {
                    const year = u.date.slice(0, 4);
                    const yearMarker = year !== lastYear;
                    lastYear = year;
                    const journey = kindOf(u) === "journey";

                    return (
                        <li key={u.slug} className="relative pb-12 pl-8 last:pb-0">
                            {yearMarker && (
                                <div className="-ml-8 mb-8 pl-8 font-heading text-[15px] font-medium text-text-subtle">
                                    {year}
                                </div>
                            )}
                            <div className="relative">
                                {/* Releases get a filled dot, journey milestones a ring. */}
                                <span
                                    aria-hidden
                                    className={cn(
                                        "absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full",
                                        journey ? "border-2 border-warning-foreground bg-surface-bg" : "bg-accent",
                                    )}
                                />
                                <time dateTime={u.date} className="font-content text-[13px] text-text-subtle">
                                    {formatUpdateDate(u.date)}
                                </time>

                                <h2 className="mt-1.5 font-heading text-[22px] font-medium leading-snug tracking-[-0.01em] text-text-primary">
                                    <Link href={`/updates/${u.slug}`} className="unstyled-link hover:underline">
                                        {u.title}
                                    </Link>
                                </h2>
                                <p className="mt-2 font-content text-[15px] leading-[1.6] text-text-muted">
                                    {u.summary}
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {journey && (
                                        <Tag
                                            variant="default"
                                            size="small"
                                            className="border-warning-border bg-warning-bg text-warning-foreground"
                                        >
                                            Journey
                                        </Tag>
                                    )}
                                    {u.tags.map((t) => (
                                        <Tag key={t} variant="muted" size="small">
                                            {t}
                                        </Tag>
                                    ))}
                                    <Link href={`/updates/${u.slug}`} className="ml-1 font-content text-[13px]">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}
