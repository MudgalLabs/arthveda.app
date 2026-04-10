import React from "react";
import Image from "next/image";

export default function FounderLetter() {
    return (
        <section>
            <div className="mx-auto">
                <div className="text-center">
                    <h3 className="section-header">Why Arthveda exists</h3>
                    <p className="text-text-muted mt-3">
                        My small message to you.
                    </p>
                </div>

                <div className="relative max-w-[814px] mx-auto my-12 mt-18 overflow-hidden sm:overflow-visible">
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
                            <p>Hey —</p>

                            <p>I’m Shikhar, founder of Arthveda.</p>

                            <p>
                                When I started trading, I struggled to
                                understand my own performance.
                            </p>

                            <p>
                                I tried journaling tools, but none really worked
                                for Indian traders — no broker integrations,
                                expensive pricing.
                            </p>

                            <p>We were clearly not the audience.</p>

                            <p>So I built Arthveda — journal made for India.</p>

                            <p>
                                Integrates with Indian brokers. Clear analytics
                                that actually help you improve. Pricing that
                                doesn’t punish beginners.
                            </p>

                            <p>
                                I believe learning from your trades shouldn’t be
                                complicated or costly.
                            </p>

                            <p>
                                If it helps you trade with more clarity and
                                discipline, that’s a win.
                            </p>

                            <p>Thanks for giving it a look.</p>
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
