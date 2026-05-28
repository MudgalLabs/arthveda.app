import React from "react";
import Image from "next/image";

export default function FounderLetter() {
    return (
        <section>
            <div className="mx-auto">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h3 className="section-header">A note from the founder</h3>
                </div>

                <div className="relative max-w-[814px] mx-auto my-12 sm:mt-12 md:mt-18 overflow-hidden sm:overflow-visible">
                    {/* Stacked background pages - top and bottom */}
                    <div
                        className="pointer-events-none select-none absolute inset-0"
                        aria-hidden="true"
                    >
                        {/* Top stack */}
                        <div
                            className="dark:bg-surface-2 shadow-lg absolute w-full h-full"
                            style={{
                                top: -24,
                                left: -18,
                                transform: "rotate(-2deg)",
                                zIndex: 0,
                                opacity: 0.7,
                            }}
                        />
                        {/* Bottom stacks */}
                        <div
                            className="dark:bg-surface-2 shadow-lg absolute w-full h-full"
                            style={{
                                top: 16,
                                left: 18,
                                transform: "rotate(-2deg)",
                                zIndex: 0,
                                opacity: 0.7,
                            }}
                        />
                    </div>

                    {/* Main letter, slanted */}
                    <article
                        className="relative bg-surface-2 dark:bg-surface shadow-lg px-8 py-4 md:px-[93px] md:py-[87px] text-text-primary"
                        role="article"
                        style={{ zIndex: 1, transform: "rotate(-0.5deg)" }}
                    >
                        <div className="text-sm sm:text-base leading-snug space-y-6 not-italic">
                            <p>Hey,</p>

                            <p>
                                Most trading tools remember what the market did.
                                <br />
                                Very few remember what you did.
                            </p>

                            <p>
                                I built Arthveda because I could never find a
                                system that remembered my journey with a stock.
                            </p>

                            <p>
                                The first time I noticed it.
                                <br />
                                The setup I saw.
                                <br />
                                The mistake I made.
                                <br />
                                The trade I took six months later.
                                <br />
                                The lesson I learned after all of it.
                            </p>

                            <p>Everything was fragmented.</p>

                            <p>
                                So I built the tool I wished existed when I
                                started trading: a place to discover stocks,
                                track decisions, journal trades, and build a
                                real trading process over time.
                            </p>

                            <p>
                                Most traders only share their P&amp;L. Arthveda
                                lets you share the process behind it — the
                                screener, the watchlist, the trades, the
                                lessons.
                            </p>

                            <p>Private by default. Shared by choice.</p>

                            <p>Thanks for being here.</p>
                        </div>
                        <div className="mt-10 flex items-center">
                            <Image
                                src="/images/me.webp"
                                alt="Shikhar Sharma"
                                className="rounded-full mr-4"
                                width={64}
                                height={64}
                                sizes="(min-width: 768px) 64px, 64px" // ensures sharpness on high-DPI screens
                                loading="lazy"
                            />
                            <div>
                                <div className="font-bold text-base text-text-primary">
                                    Shikhar Sharma
                                </div>
                                <div className="text-text-muted text-sm">
                                    Founder
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
