import React from "react";

export default function FounderLetter() {
    return (
        <div className="relative max-w-[814px] mx-auto my-12 mt-32 overflow-hidden sm:overflow-visible">
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
                className="relative bg-surface-2 dark:bg-surface shadow-lg px-[93px] py-[87px] text-text-primary"
                role="article"
                style={{ zIndex: 1, transform: "rotate(-0.5deg)" }}
            >
                <div className="text-[15px] sm:text-[22px] leading-snug space-y-8 not-italic">
                    <p>Hey everyone —</p>

                    <p>I’m Shikhar, founder of Arthveda.</p>
                    <p>
                        When I started trading, I struggled to understand my own
                        performance.
                    </p>
                    <p>
                        I tried journaling tools, but none really worked for
                        Indian traders. No broker integrations. Expensive
                        pricing.
                    </p>

                    <p>We were clearly not the audience.</p>
                    <p>So I built Arthveda — a journal made for India.</p>
                    <p>
                        Integrations with our brokers.
                        <br />
                        Clear analytics that actually help you improve.
                        <br />
                        Pricing that doesn’t punish beginners.
                    </p>
                    <p>
                        Arthveda exists because I believe learning from your own
                        trades shouldn’t be complicated or costly.
                    </p>
                    <p>
                        If it helps even a few traders trade more responsibly,
                        <br />
                        more confidently, and with more awareness —
                        <br />
                        that’s a win worth building for.
                    </p>
                    <p>
                        Thanks for giving it a look.
                        <br />I hope it helps you the way it helped me.
                    </p>
                </div>
                <div className="mt-10 flex items-center">
                    <div>
                        <div className="font-bold text-base text-text-primary">
                            Shikhar Sharma
                        </div>
                        <div className="text-text-muted text-base ">
                            Founder
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
