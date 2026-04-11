import Image from "next/image";

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
                    most popular brokers. Requests for new integrations are
                    welcome!
                </p>
            </div>
        </section>
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
