import Image from "next/image";
import Link from "next/link";

import { BROKERS } from "@/lib/brokers";
import { Tag } from "@/ui/tag";

export default function Brokers() {
    return (
        <section id="brokers" className="mt-24">
            <div className="text-center mb-8">
                <h3 className="section-header">
                    Your broker talks. Arthveda listens.
                </h3>

                <div className="h-4" />

                <p className="section-detail">
                    Import trades via file upload <strong>in seconds</strong>.
                    Sync today’s trades with a single click. Supports India’s
                    most popular brokers, and new ones on request.
                </p>
            </div>
        </section>
    );
}

// A few well-known brokers to feature on the homepage Journal block. The full
// list lives on /brokers, so this stays compact as we add more integrations.
const FEATURED_BROKERS = ["Angel One", "Groww", "Zerodha", "Dhan"];

// Compact, static broker strip for the homepage Journal block — a few logos +
// "+N more" → /brokers, so adding brokers never expands this. See plan §5.
export function BrokerStripStatic() {
    const featured = FEATURED_BROKERS.map((name) =>
        BROKERS.find((b) => b.name === name),
    ).filter((b): b is (typeof BROKERS)[number] => Boolean(b));

    const moreCount = BROKERS.length - featured.length;

    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {featured.map(({ name, svg, landingPath, isComingSoon }) => {
                const logo = (
                    <span className="inline-flex items-center gap-1.5">
                        <Image
                            src={svg}
                            alt={`${name} logo`}
                            width={90}
                            height={20}
                            className="max-h-6 w-auto shrink-0 opacity-60 grayscale transition-opacity hover:opacity-100"
                        />
                        {isComingSoon && (
                            <Tag size="small" className="shrink-0">
                                Soon
                            </Tag>
                        )}
                    </span>
                );

                // Brokers with a landing page link to it; the rest stay static.
                return landingPath ? (
                    <Link
                        key={name}
                        href={landingPath}
                        aria-label={`${name} trading journal`}
                        className="shrink-0"
                    >
                        {logo}
                    </Link>
                ) : (
                    <span key={name} className="shrink-0">
                        {logo}
                    </span>
                );
            })}

            {moreCount > 0 && (
                <Link
                    href="/brokers"
                    className="text-sm font-medium text-text-muted no-underline! transition-colors hover:text-text-primary"
                >
                    +{moreCount} more
                </Link>
            )}
        </div>
    );
}

export function BrokerStrip() {
    // Duplicate brokers for seamless scroll
    const scrollingBrokers = [...BROKERS, ...BROKERS, ...BROKERS];

    return (
        <div className="relative overflow-hidden w-full pb-6 sm:pt-6">
            <div
                className="flex items-center gap-x-6 animate-[broker-scroll_30s_linear_infinite] will-change-transform"
                style={{ minWidth: "max-content" }}
            >
                {scrollingBrokers.map(
                    ({ name, svg, homepage, isComingSoon }, idx) => (
                        <div key={name + idx} className="relative shrink-0">
                            <a
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block group transition-transform"
                            >
                                <div className="relative">
                                    <Image
                                        src={svg}
                                        alt={`${name} logo`}
                                        width={90}
                                        height={20}
                                        className="grayscale opacity-69 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200 max-h-24"
                                    />
                                </div>
                            </a>
                            {isComingSoon && (
                                <Tag
                                    className="absolute -bottom-5 right-0 text-[10px]"
                                    size="small"
                                >
                                    Soon
                                </Tag>
                            )}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
