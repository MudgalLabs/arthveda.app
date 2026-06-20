import type { Metadata } from "next";
import { Plug } from "lucide-react";

import { BrokerDirectory } from "@/components/broker_directory";
import { FamilyLabel } from "@/components/family_label";
import { CONTACT_EMAIL } from "@/components/segment_chips";

export const metadata: Metadata = {
    title: "Brokers · Arthveda",
    description:
        "Import your trades from supported Indian brokers in seconds. No manual work.",
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
                    Import your trades from supported brokers in seconds. No
                    manual work.
                </p>
                <p className="mt-3 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    If your broker is not in the list below, write to us at{" "}
                    <a
                        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Add broker support")}`}
                        className="text-[15px]! font-medium text-link no-underline! transition-colors hover:text-text-primary hover:underline!"
                    >
                        {CONTACT_EMAIL}
                    </a>{" "}
                    and we&rsquo;ll be happy to integrate it.
                </p>
            </section>

            {/* Full-bleed divider after the hero — same treatment as the hubs. */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            <BrokerDirectory />
        </main>
    );
}
