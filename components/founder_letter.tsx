import React from "react";
import Image from "next/image";

export default function FounderLetter() {
    return (
        <section>
            <div className="mx-auto">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h3 className="section-header">A note from the creator</h3>
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

                        {/* Bottom stack */}
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
                        style={{
                            zIndex: 1,
                            transform: "rotate(-0.5deg)",
                        }}
                    >
                        <div className="text-sm sm:text-base leading-snug space-y-6 not-italic">
                            <p>Hey,</p>

                            <p>
                                Most trading tools remember what the market did.
                                <br />
                                Very few remember what you did.
                            </p>

                            <p>
                                I built Arthveda because my trading journey was
                                scattered across too many places.
                            </p>

                            <p>
                                I discovered stocks in a screener.
                                <br />
                                Tracked them in a watchlist somewhere else.
                                <br />
                                Placed trades through my broker.
                                <br />
                                Recorded my trades in a journal, with my notes
                                and lessons somewhere else.
                            </p>

                            <p>
                                The first time I noticed a stock.
                                <br />
                                The setup I was waiting for.
                                <br />
                                The trade I eventually took.
                                <br />
                                The mistake I made.
                                <br />
                                The lesson I carried into the next one.
                            </p>

                            <p>
                                Every part of the journey was connected in my
                                head, but fragmented across tools.
                            </p>

                            <p>
                                So I built the tool I wished existed when I
                                started trading — a trading workspace where I
                                could discover stocks, build watchlists, track
                                decisions, journal trades, and look back at how
                                my thinking evolved over time.
                            </p>

                            <p>
                                Because your trading journey is more than the
                                trades you take. <br />
                                Arthveda keeps the whole journey together.
                            </p>

                            <p>Thanks for being here.</p>
                        </div>

                        <div className="mt-10 flex items-center">
                            <Image
                                src="https://ceoshikhar.com/images/me.jpg"
                                alt="Shikhar Sharma"
                                className="rounded-full mr-4"
                                width={64}
                                height={64}
                                sizes="64px"
                                loading="lazy"
                            />

                            <div>
                                <div className="font-hand leading-none text-3xl text-text-primary">
                                    Shikhar Sharma
                                </div>
                                <a
                                    href="https://ceoshikhar.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs! "
                                >
                                    Creator of Arthveda · ceoshikhar.com
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
