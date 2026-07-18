import { ShieldCheck } from "lucide-react";

import type { Broker } from "@/lib/brokers";

// One-line read-only reassurance for broker landing pages. The body adapts to
// how the broker's trades get in: sync + file (Zerodha), sync only (Dhan), or
// file only (everyone else).
export function BrokerTrustStrip({ broker }: { broker: Broker }) {
    const hasSync = broker.importTypes.some(
        (t) => t === "auto" || t === "today",
    );
    const hasFile = broker.importTypes.includes("file");

    let body: React.ReactNode;
    if (hasSync && hasFile) {
        body = (
            <>
                With broker sync, Arthveda only reads your trade history. It
                never sees your funds and never places orders. Import by file and
                all it ever sees are the trades in that file.
            </>
        );
    } else if (hasSync) {
        body = (
            <>
                Arthveda connects through {broker.name}&apos;s secure login and
                only reads your trade history. It never sees your funds and never
                places orders.
            </>
        );
    } else {
        body = (
            <>
                You import a file, so all Arthveda ever sees are the trades
                inside it, never your funds or anything else in your account.
            </>
        );
    }

    return (
        <div className="mx-auto mt-12 flex max-w-3xl items-start gap-3 rounded-lg border border-white/[0.10] bg-surface-1/25 px-5 py-4">
            <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-text-primary"
                aria-hidden
            />
            <p className="font-content text-[14px] leading-[1.6] text-text-muted">
                <span className="text-text-primary">Read-only, always.</span>{" "}
                {body}
            </p>
        </div>
    );
}
