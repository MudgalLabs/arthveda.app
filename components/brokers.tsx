import { Tag } from "@/ui/tag";
import Image from "next/image";

export default function Brokers() {
    /* Replace these with real SVG components or <Image> tags */
    const brokers = [
        {
            name: "Angel One",
            svg: "/svgs/angel_one.svg",
            homepage: "https://www.angelone.in/",
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
                <h2 className="big-heading md:max-w-[80%] mx-auto">
                    Import trades through seamless integration with{" "}
                    <span className="text-accent font-semibold!">
                        your broker.
                    </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto">
                    Arthveda supports these brokers. We welcome request for new
                    integrations!
                </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 sm:gap-12">
                {brokers.map(({ name, svg, homepage, isComingSoon }) => (
                    <div key={name} className="relative">
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
                                    // className="grayscale brightness-70 contrast-50 hover:brightness-100 hover:contrast-0 transition-all duration-100 hover:from-foreground hover:to-foreground"
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
                ))}
            </div>
        </section>
    );
}
