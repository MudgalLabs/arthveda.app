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
                {/* Which markets, stated once, India first (global but
                    India-first, 2026-10-31). The tagline itself names no
                    country. Shaped like feature_card's pill, but lifted
                    (lighter fill, stronger border, brighter text): it sits on
                    the bare page background, where that pill's
                    bg-background/60 fill disappears. */}
                <span className="inline-block rounded-full border border-white/[0.14] bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-text-primary">
                    For Indian and US markets
                </span>

                <div className="h-5 sm:h-6" />

                <h1 className="font-heading text-text-primary text-[40px] sm:text-[52px] lg:text-[64px] font-medium leading-[1.04] tracking-[-0.025em]">
                    Trading OS
                </h1>

                <div className="h-6 sm:h-7" />

                {/* Subtitle. No holding-period qualifier (2026-07-20) and no
                    "Indian" qualifier (2026-10-30, global but India-first): the
                    differentiation is "OS" + "one workspace", never the
                    trading style or the country. */}
                <h2 className="font-content text-[15px] leading-[1.6] text-text-muted max-w-2xl">
                    Built for traders to discover stocks, build intelligent
                    watchlists, track their journey with every stock, journal
                    trades, and share their process, not just P&amp;L. All
                    from one workspace.
                </h2>

                <div className="h-9 sm:h-10" />

                {/* items-start, not items-center: the primary CTA carries a
                    note beneath it, so centring would push the ghost button
                    down against the taller stack instead of keeping the two
                    buttons level. */}
                <div className="flex flex-wrap items-start gap-3">
                    {/* Primary, product-level CTA — filled, no icon, sentence
                        case (plan §5 Copy voice). Goes to the app, not the
                        screener; we never anchor a screener-level CTA.
                        w-fit so the note centres on the button, not on the row. */}
                    <div className="w-fit">
                        <a
                            href={APP_URL}
                            onClick={() =>
                                posthog.capture("Clicked Get started", {
                                    location: "hero",
                                })
                            }
                            className="unstyled-link block"
                        >
                            {/* w-full: the note below is wider than the label,
                                so the button matches it and stays centred. */}
                            <Button variant="primary" size="large" className="w-full">
                                Try it free for 14 days
                            </Button>
                        </a>
                        {/* The price link sits here because "free for 14 days"
                            is exactly where "and then what?" comes up, and on
                            mobile the nav's Pricing link is behind the menu. */}
                        <p className="mt-2 whitespace-nowrap text-center text-sm text-text-subtle">
                            No card required ·{" "}
                            <Link
                                href="/pricing"
                                onClick={() =>
                                    posthog.capture("Clicked See pricing", {
                                        location: "hero",
                                    })
                                }
                            >
                                See pricing
                            </Link>
                        </p>
                    </div>

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

                <div className="h-6 sm:h-7" />

                {/* AI hook — a quiet link under the CTAs (not a second headline;
                    the locked subtitle above stays verbatim). No leading icon, so
                    it aligns flush-left with the title/subtitle on every screen;
                    standard link styling (text-link + underline on hover, from the
                    global `a` rule). Full pitch on /product/ai. */}
                <Link
                    href="/product/ai"
                    onClick={() =>
                        posthog.capture("Clicked AI hero link", {
                            location: "hero",
                        })
                    }
                >
                    Arthveda MCP: connect an AI assistant to your journal and
                    learn more about yourself and your trading.
                </Link>

            </div>

            <div className="h-8 sm:h-10 lg:h-14" />

            {/* Hero loop video: lit stage, single shell + content. Autoplays
                muted and loops seamlessly (frame 2399 flows into frame 0); the
                poster is the video's exact first frame, so the LCP paint and
                the first video frame match. Source lives in video/ (Remotion).
                AV1 first for Chrome/Firefox/Edge and AV1-capable Safari; the
                codecs string makes other browsers skip to the H.264 MP4. */}
            <LitMedia
                src="/images/v2/hero-loop-poster.webp"
                alt="Arthveda: every screen of the Trading OS around the logo, from Market Monitor and the Screener to the Symbol Journey, Journal and public profile"
                priority
                autoPlay
                videoSrcWebm="/videos/hero-loop.webm"
                videoTypeWebm='video/webm; codecs="av01.0.09M.10"'
                videoSrc="/videos/hero-loop.mp4"
                videoType='video/mp4; codecs="avc1.64002A"'
            />
        </section>
    );
}
