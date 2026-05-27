"use client";

import posthog from "posthog-js";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/ui/button";
import { APP_URL } from "@/lib/links";
import LitMedia from "@/components/lit_media";

export default function Hero() {
    return (
        <section className="relative pt-20 sm:pt-28 lg:pt-40">
            {/* Hero text block — inset a little from the left on desktop so it
                reads "inside" the layout, à la Linear (the full-bleed video
                stage below ignores this padding). */}
            <div className="max-w-3xl text-left lg:pl-8 xl:pl-12">
                <h1 className="font-heading text-text-primary text-[40px] sm:text-[52px] lg:text-[64px] font-medium leading-[1.04] tracking-[-0.025em]">
                    Trading OS for India
                </h1>

                <div className="h-6 sm:h-7" />

                {/* Locked subtitle — verbatim from v2_marketing_plan.md §1. */}
                <h2 className="font-content text-[15px] leading-[1.6] text-text-muted max-w-2xl">
                    Built for swing traders to discover stocks, build
                    intelligent watchlists, track their journey with every
                    stock, journal trades, and share their process — not just
                    P&amp;L. All from one workspace.
                </h2>

                <div className="h-9 sm:h-10" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Primary, product-level CTA — filled, no icon, sentence
                        case (plan §5 Copy voice). Goes to the app, not the
                        screener; we never anchor a screener-level CTA. */}
                    <a
                        href={APP_URL}
                        onClick={() =>
                            posthog.capture("Clicked Get started", {
                                location: "hero",
                            })
                        }
                        className="unstyled-link"
                    >
                        <Button variant="primary" size="large">
                            Get started
                        </Button>
                    </a>

                    {/* Secondary ghost link — small chevron for affordance. */}
                    <Link href="#product" className="unstyled-link">
                        <Button variant="ghost" size="large">
                            <span className="flex-x">
                                Explore product
                                <ChevronRight size={16} />
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="h-8 sm:h-10 lg:h-14" />

            {/* Hero flow-loop video — lit stage, single shell + content (no
                extra panel). Poster = LCP (the /symbols/IRFC command center, §6);
                the flow-loop video autoplays here later (no play button — that's
                the walkthrough's). */}
            <LitMedia
                src="/images/v2/video-poster.png"
                alt="Arthveda — your stock's full journey: chart with your trade markers, timeline, and performance"
                placeholderLabel="See the workflow in action · 48s"
                priority
                // Compressed flow-loop (see docs/v2_marketing_plan.md §6).
                // Click-to-play; the poster is the crisp default + LCP.
                videoSrc="/videos/flow-loop.mp4"
            />
        </section>
    );
}
