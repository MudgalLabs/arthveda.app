"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    LayoutGrid,
    Minus,
    Search,
    Table as TableIcon,
} from "lucide-react";

import { CONTACT_EMAIL, SEGMENT_DETAIL } from "@/components/segment_chips";
import {
    Broker,
    BrokerSegment,
    BROKERS,
    SegmentLabel,
    SegmentState,
} from "@/lib/brokers";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table";

// Brokers shown on the directory. Coming-soon brokers live in the homepage strip
// only, not here. Computed once at module scope since the source list is static.
const VISIBLE_BROKERS = BROKERS.filter((b) => !b.isComingSoon);

// Email link prefilled to ask us to add import support for a segment.
const segmentMailto = (label: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Import support: ${label}`)}`;

type View = "grid" | "table";

export function BrokerDirectory() {
    const [view, setView] = useState<View>("table");
    const [query, setQuery] = useState("");

    const brokers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return VISIBLE_BROKERS;
        return VISIBLE_BROKERS.filter((b) =>
            b.name.toLowerCase().includes(q),
        );
    }, [query]);

    return (
        <>
            {/* Toolbar: search on the left, grid/table toggle on the right.
                Stays a single row on mobile too. */}
            <div className="mt-12 flex items-center justify-between gap-3">
                <div className="relative w-full min-w-0 sm:max-w-xs">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
                    />
                    <Input
                        type="search"
                        placeholder="Search brokers"
                        aria-label="Search brokers"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-9 sm:w-full"
                    />
                </div>

                <div className="flex w-fit shrink-0 items-center gap-1 rounded-md border-1 border-border-subtle p-1">
                    <ViewToggle
                        active={view === "grid"}
                        onClick={() => setView("grid")}
                        label="Grid view"
                    >
                        <LayoutGrid size={16} />
                    </ViewToggle>
                    <ViewToggle
                        active={view === "table"}
                        onClick={() => setView("table")}
                        label="Table view"
                    >
                        <TableIcon size={16} />
                    </ViewToggle>
                </div>
            </div>

            {brokers.length > 0 && <Legend />}

            {brokers.length === 0 ? (
                <p className="mt-16 text-center text-sm text-text-muted">
                    No brokers match “{query.trim()}”.{" "}
                    <a
                        href={segmentMailto(query.trim())}
                        className="text-link no-underline! transition-colors hover:text-text-primary"
                    >
                        Request it →
                    </a>
                </p>
            ) : view === "grid" ? (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {brokers.map((b) => (
                        <BrokerCard key={b.name} broker={b} />
                    ))}
                </div>
            ) : (
                <BrokerTable brokers={brokers} />
            )}
        </>
    );
}

// Key for the state markers, shared by both views. text-text-subtle muted so it
// reads as a footnote, not a row of its own.
function Legend() {
    return (
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-subtle">
            <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-success" /> Supported
            </span>
            <span>Request · email us</span>
            <span>Manual · log by hand</span>
        </p>
    );
}

function ViewToggle({
    active,
    onClick,
    label,
    children,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            aria-pressed={active}
            className={cn(
                "flex h-8 w-8 items-center justify-center rounded transition-colors",
                active
                    ? "bg-secondary text-text-primary"
                    : "text-text-subtle hover:text-text-primary",
            )}
        >
            {children}
        </button>
    );
}

/* ----------------------------- Grid (cards) ----------------------------- */

// Tiny uppercase section label, the structural cue that lets the card read as a
// support matrix instead of a wall of pills.
function SectionLabel({ children }: { children: string }) {
    return (
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-subtle">
            {children}
        </p>
    );
}

// "Request" mailto for anything we don't support yet — a segment we haven't
// built or an import method nobody has asked for. None of it is impossible, it
// just needs a nudge, so we invite the ask instead of showing a dead dash.
function RequestLink({ label }: { label: string }) {
    return (
        <a
            href={segmentMailto(label)}
            title={`Email us and we'll add ${label} support`}
            className="relative z-10 text-link no-underline! transition-colors hover:text-text-primary hover:underline!"
        >
            Request
        </a>
    );
}

// One segment as a row: a state marker + label + a muted note. Same data and
// states as <SegmentChips>, but de-pilled so several rows stack quietly. See
// SegmentState in lib/brokers.ts for what each state means.
function SegmentRow({ segment }: { segment: BrokerSegment }) {
    const { label, state } = segment;

    if (state === "supported") {
        return (
            <li className="flex items-start gap-2 text-sm">
                <Check size={14} className="mt-0.5 shrink-0 text-success" />
                <span className="text-text-primary">
                    {label}
                    <span className="text-text-subtle">
                        {" · "}
                        {SEGMENT_DETAIL[label]}
                    </span>
                </span>
            </li>
        );
    }

    if (state === "manual") {
        return (
            <li className="flex items-start gap-2 text-sm">
                <Minus size={14} className="mt-0.5 shrink-0 text-text-subtle" />
                <span className="text-text-muted">
                    {label}
                    <span className="text-text-subtle"> · log manually</span>
                </span>
            </li>
        );
    }

    // on-request: we can build the parser if someone shares an export. Only the
    // "Request" text is the mailto link; the separator dot stays plain.
    return (
        <li className="flex items-start gap-2 text-sm">
            <Minus size={14} className="mt-0.5 shrink-0 text-text-subtle" />
            <span className="text-text-muted">
                {label}
                <span className="text-text-subtle"> · </span>
                <RequestLink label={label} />
            </span>
        </li>
    );
}

// One import method on a card: green check + label when supported, otherwise the
// method name + a "Request" link (mirrors the table's Sync/Upload columns), so a
// missing method reads as "ask us", not a dead end.
function ImportItem({
    ok,
    okLabel,
    name,
}: {
    ok: boolean;
    okLabel: string;
    name: string;
}) {
    if (ok) {
        return (
            <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                <Check size={14} className="shrink-0 text-success" />
                {okLabel}
            </span>
        );
    }
    // Plain inline span (not flex) so the spaces around the separator survive.
    return (
        <span className="text-sm text-text-muted">
            {name}
            <span className="text-text-subtle"> · </span>
            <RequestLink label={name} />
        </span>
    );
}

function BrokerCard({ broker }: { broker: Broker }) {
    const hasSync = broker.importTypes.some(
        (t) => t === "auto" || t === "today",
    );
    const syncLabel = broker.importTypes.includes("auto")
        ? "Auto sync"
        : hasSync
          ? "Sync today"
          : "Sync";
    const hasUpload = broker.importTypes.includes("file");

    return (
        <Card
            className={cn(
                "group relative flex flex-col p-5 text-left",
                broker.landingPath &&
                    "cursor-pointer transition-colors hover:border-border-accent hover:ring-1 hover:ring-border-accent/40",
            )}
        >
            <div className="flex items-center gap-3">
                <Image
                    src={broker.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 object-contain"
                />
                <h3 className="text-lg font-medium text-text-primary">
                    {broker.name}
                </h3>
            </div>

            {/* Segments */}
            <div className="mt-4">
                <SectionLabel>Segments</SectionLabel>
            </div>
            <ul className="mt-2 space-y-1.5">
                {broker.segments.map((segment) => (
                    <SegmentRow key={segment.label} segment={segment} />
                ))}
            </ul>

            {/* Import methods */}
            <div className="mt-4">
                <SectionLabel>Import</SectionLabel>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                    <ImportItem
                        ok={hasUpload}
                        okLabel="File upload"
                        name="File upload"
                    />
                    <ImportItem ok={hasSync} okLabel={syncLabel} name="Sync" />
                </div>
            </div>

            {/* Learn more — only when a broker has a landing page. The stretched
                link (after:absolute after:inset-0) makes the whole card
                clickable; the hover state is driven by card hover. */}
            {broker.landingPath && (
                <Link
                    href={broker.landingPath}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link no-underline! transition-colors after:absolute after:inset-0 group-hover:text-text-primary"
                >
                    Learn more
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                    />
                </Link>
            )}
        </Card>
    );
}

/* ------------------------------- Table ------------------------------- */

// The normalized segment columns. A broker that groups F&O reports the same
// state for both Options and Futures; brokers that split them report each.
const SEGMENT_COLUMNS: Exclude<SegmentLabel, "F&O">[] = [
    "Cash",
    "Options",
    "Futures",
];

// Resolve a broker's state for a normalized column, folding "F&O" into both
// Options and Futures. "none" means the broker doesn't offer that segment.
function segmentState(
    broker: Broker,
    column: Exclude<SegmentLabel, "F&O">,
): SegmentState | "none" {
    const direct = broker.segments.find((s) => s.label === column);
    if (direct) return direct.state;

    if (column !== "Cash") {
        const fno = broker.segments.find((s) => s.label === "F&O");
        if (fno) return fno.state;
    }

    return "none";
}

function StateCell({
    state,
    label,
}: {
    state: SegmentState | "none";
    label: string;
}) {
    if (state === "supported") {
        return (
            <Check
                size={16}
                className="mx-auto text-success"
                aria-label="Supported"
            />
        );
    }
    if (state === "manual") {
        // text-sm to match the "Request" anchor, which globals.css forces to
        // text-sm regardless of utility class (see app/globals.css `a` rule).
        return <span className="text-sm text-text-subtle">Manual</span>;
    }
    // on-request or none — not built yet, but requestable rather than impossible.
    return <RequestLink label={label} />;
}

function BoolCell({ ok, label }: { ok: boolean; label: string }) {
    return ok ? (
        <Check size={16} className="mx-auto text-success" aria-label={label} />
    ) : (
        <RequestLink label={label} />
    );
}

function BrokerTable({ brokers }: { brokers: Broker[] }) {
    return (
        <div className="mt-8">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-0">Broker</TableHead>
                        {SEGMENT_COLUMNS.map((c) => (
                            <TableHead key={c} className="text-center">
                                {c}
                            </TableHead>
                        ))}
                        <TableHead className="text-center">Upload</TableHead>
                        <TableHead className="text-center">Sync</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brokers.map((broker) => {
                        const canSync = broker.importTypes.some(
                            (t) => t === "auto" || t === "today",
                        );
                        const canUpload = broker.importTypes.includes("file");
                        const name = (
                            <span className="inline-flex items-center gap-2.5">
                                <Image
                                    src={broker.icon}
                                    alt=""
                                    width={22}
                                    height={22}
                                    className="h-[22px] w-[22px] shrink-0 object-contain"
                                />
                                <span className="font-medium text-text-primary">
                                    {broker.name}
                                </span>
                            </span>
                        );
                        return (
                            <TableRow key={broker.name}>
                                <TableCell className="pl-0">
                                    {broker.landingPath ? (
                                        <Link
                                            href={broker.landingPath}
                                            className="no-underline! transition-opacity hover:opacity-80"
                                        >
                                            {name}
                                        </Link>
                                    ) : (
                                        name
                                    )}
                                </TableCell>
                                {SEGMENT_COLUMNS.map((c) => (
                                    <TableCell key={c} className="text-center">
                                        <StateCell
                                            state={segmentState(broker, c)}
                                            label={c}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell className="text-center">
                                    <BoolCell
                                        ok={canUpload}
                                        label="File upload"
                                    />
                                </TableCell>
                                <TableCell className="text-center">
                                    <BoolCell ok={canSync} label="Sync" />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
