import { Tag } from "@/ui/tag";
import Image from "next/image";

interface Broker {
    name: string;
    svg: string;
    homepage: string;
    isComingSoon?: boolean;
}

export default function Brokers() {
    const brokers: Broker[] = [
        {
            name: "Angel One",
            svg: "/svgs/angel_one.svg",
            homepage: "https://www.angelone.in/",
        },
        {
            name: "Fyers",
            svg: "/svgs/fyers.svg",
            homepage: "https://fyers.in/",
        },
        {
            name: "Dhan",
            svg: "/svgs/dhan.svg",
            homepage: "https://dhan.co/",
            isComingSoon: true,
        },
        {
            name: "Groww",
            svg: "/svgs/groww.svg",
            homepage: "https://groww.in/",
        },
        {
            name: "INDmoney",
            svg: "/svgs/indmoney.svg",
            homepage: "https://www.indmoney.com/",
        },
        {
            name: "Kotak Securities",
            svg: "/svgs/kotak_securities.svg",
            homepage: "https://www.kotaksecurities.com/",
        },
        {
            name: "Upstox",
            svg: "/svgs/upstox.svg",
            homepage: "https://upstox.com/",
            isComingSoon: false,
        },
        {
            name: "Zerodha",
            svg: "/svgs/zerodha.svg",
            homepage: "https://zerodha.com/",
        },
        /* Add more brokers as integration ships */
    ];

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

            <BrokerStrip brokers={brokers} />
        </section>
    );
}

function BrokerStrip({ brokers }: { brokers: Broker[] }) {
    // Duplicate brokers for seamless scroll
    const scrollingBrokers = [...brokers, ...brokers];

    return (
        <div className="relative overflow-hidden w-full py-4">
            <div
                className="flex items-center gap-x-8 sm:gap-12 animate-[broker-scroll_30s_linear_infinite]"
                style={{
                    minWidth: "max-content",
                }}
            >
                {scrollingBrokers.map(
                    ({ name, svg, homepage, isComingSoon }, idx) => (
                        <div
                            key={name + idx}
                            className="relative flex-shrink-0"
                        >
                            <a
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block group hover:-translate-y-1 transition-transform"
                            >
                                <div className="relative">
                                    <Image
                                        src={svg}
                                        alt={`${name} logo`}
                                        width={150}
                                        height={40}
                                        className="grayscale opacity-69 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200 max-h-24"
                                    />
                                </div>
                            </a>
                            {isComingSoon && (
                                <Tag
                                    className="absolute -bottom-5 right-0"
                                    size="small"
                                >
                                    Coming Soon
                                </Tag>
                            )}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
