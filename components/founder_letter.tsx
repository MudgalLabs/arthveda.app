import React from "react";
import Image from "next/image";

export default function FounderLetter() {
    return (
        <section>
            <div className="mx-auto">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h3 className="section-header">Why Arthveda exists</h3>

                    <p className="text-text-muted mt-3">
                        My small message to you.
                    </p>
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

                            <p>I’m Shikhar, founder of Arthveda.</p>

                            <p>
                                When I started swing trading, my process was
                                scattered across a dozen tabs. A screener here, a
                                watchlist there, trade notes in a spreadsheet,
                                and nothing that remembered why I made a call or
                                whether it actually worked.
                            </p>

                            <p>
                                So the tools never helped me get better. They
                                just stored data.
                            </p>

                            <p>
                                I built Arthveda to hold the whole loop in one
                                place: find an idea, track what happens to it,
                                journal the decision, and learn from the outcome.
                                Process over P&amp;L.
                            </p>

                            <p>
                                No tips. No signals. No leaderboards. Just a
                                workspace that helps you trade more deliberately,
                                and a track record you can stand behind.
                            </p>

                            <p>
                                If it helps you trade with more clarity, that’s a
                                win.
                            </p>

                            <p>Thanks for taking a look.</p>
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
