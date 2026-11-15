"use client";

import Image from "next/image";
import posthog from "posthog-js";

import { ChatLink } from "@/components/chat_link";
import { CONTACT_EMAIL } from "@/components/segment_chips";
import {
    UNSUPPORTED_PLATFORM_GROUPS,
    UNSUPPORTED_PLATFORMS,
    type UnsupportedPlatform,
} from "@/lib/brokers";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

// Demand collection for brokers and platforms we do NOT import from yet. Kept
// apart from <BrokerDirectory>: its own "Not supported yet" section, a status
// line on every tile, a quieter surface, no segment or import columns and no
// links out, so nobody mistakes these for supported brokers. Logos stay in full
// colour so visitors can spot their broker at a glance.
// "Request this broker" opens a pre-filled new conversation in the chat widget
// (or the same message as a mailto when the widget isn't ready).

const requestTitle = (name: string) => `Broker request: ${name}`;
const requestBody = (name: string) =>
    `Hi, I trade on ${name} and would like Arthveda to support importing my trades.`;

const requestMailto = (name: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(requestTitle(name))}&body=${encodeURIComponent(requestBody(name))}`;

export function UnsupportedBrokers() {
    return (
        <section aria-labelledby="unsupported-brokers" className="mt-24">
            <h2
                id="unsupported-brokers"
                className="font-heading text-[26px] font-medium tracking-[-0.015em] text-text-primary sm:text-[30px]"
            >
                Not supported yet
            </h2>
            <p className="mt-3 max-w-3xl font-content text-balance lg:max-w-none text-[15px] leading-[1.6] text-text-muted">
                Arthveda can&rsquo;t import trades from these brokers and
                platforms yet. Tell me you use one and I&rsquo;ll prioritise
                it.
            </p>

            <div className="mt-10 space-y-10">
                {UNSUPPORTED_PLATFORM_GROUPS.map((group) => (
                    <div key={group}>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-text-subtle">
                            {group}
                        </p>
                        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {UNSUPPORTED_PLATFORMS.filter(
                                (p) => p.group === group,
                            ).map((p) => (
                                <UnsupportedRow key={p.name} platform={p} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Solid border on surface-1, one step quieter than the supported cards'
// surface-2, so the tiles sit a level below the directory.
function UnsupportedRow({ platform }: { platform: UnsupportedPlatform }) {
    const { name, icon, note, group } = platform;

    return (
        <li className="flex flex-col gap-3 rounded-md border-1 border-border-subtle bg-surface-1 p-4">
            <div className="flex items-center gap-3">
                <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0 rounded-sm object-contain"
                />
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                        {name}
                    </p>
                    <p className="text-xs text-text-subtle">
                        {note ? `${note} · ` : ""}Not supported yet
                    </p>
                </div>
            </div>
            <ChatLink
                href={requestMailto(name)}
                compose={{ title: requestTitle(name), body: requestBody(name) }}
                // Demand signal per broker. `via` = chat widget or mailto
                // fallback. The broker name is a fixed list value, never PII.
                onOpen={(via) =>
                    posthog.capture("Broker Requested", {
                        broker: name,
                        group,
                        via,
                    })
                }
                className={cn(
                    buttonVariants({ variant: "secondary", size: "default" }),
                    "w-full text-text-primary! no-underline! hover:bg-secondary-hover",
                )}
            >
                Request this broker
            </ChatLink>
        </li>
    );
}
