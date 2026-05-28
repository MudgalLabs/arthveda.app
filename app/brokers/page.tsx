import type { Metadata } from "next";
import { Plug } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { Broker, BROKERS } from "@/lib/brokers";
import { Card, CardContent, CardTitle } from "@/ui/card";
import { Tag } from "@/ui/tag";
import { Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Brokers · Arthveda",
    description:
        "Import your trades from supported Indian brokers in seconds — no manual work needed.",
    alternates: { canonical: "/brokers" },
};

export default function BrokersPage() {
    return (
        <main className="pb-24">
            {/* Hero — match the /product/* and /pricing hub heroes. */}
            <section className="pt-12 md:pt-16 lg:pt-20">
                <FamilyLabel name="Brokers" Icon={Plug} />
                <h1 className="mt-5 max-w-3xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:max-w-none lg:text-[60px]">
                    Works with your broker.
                </h1>
                <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Import your trades from supported brokers in seconds — no
                    manual work needed.
                </p>
            </section>

            {/* Full-bleed divider after the hero — same treatment as the hubs. */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {BROKERS.map(
                    (b) =>
                        !b.isComingSoon && (
                            <BrokerCard key={b.name} broker={b} />
                        ),
                )}
            </div>
        </main>
    );
}

function BrokerCard({ broker }: { broker: Broker }) {
    return (
        <Card className="group p-4 text-left">
            {/* Header */}
            <CardTitle className="flex items-center gap-3 mb-4">
                {/* <Image
                    src={broker.svg}
                    alt={broker.name}
                    width={96}
                    height={32}
                /> */}
                <h3>{broker.name}</h3>
            </CardTitle>

            <CardContent className="space-y-4">
                {/* Instruments */}
                <div className="flex flex-wrap gap-2">
                    {broker.instruments.map((type) => (
                        <Tag key={type} variant="muted" size="small">
                            {type.toUpperCase()}
                        </Tag>
                    ))}
                </div>

                {/* Import Types (PRIMARY) */}
                <div className="flex flex-wrap gap-4">
                    {broker.importTypes.map((type) => (
                        <div key={type} className="flex-x gap-x-1 items-center">
                            <span>
                                <Check size={14} />
                            </span>
                            <span>
                                {type === "auto" && "Auto sync"}
                                {type === "today" && "Sync today"}
                                {type === "file" && "File upload"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Coming Soon */}
                {/* {broker.isComingSoon && (
                    <div className=" text-xs text-accent">Coming soon</div>
                )} */}
            </CardContent>
        </Card>
    );
}
