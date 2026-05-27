import Image from "next/image";
import Link from "next/link";

import { FAMILIES, type ProductFamily } from "@/lib/families";
import { BrokerStripStatic } from "@/components/brokers";

// Three product sections (Discover · Journal · Social), Linear-style: a
// two-column header (title left, description + CTA right) over a large,
// borderless, left-aligned screenshot that blends into the page. The lit-stage
// treatment is reserved for the hero only — here we keep it flat so nothing
// competes with the hero for attention. See docs/v2_marketing_plan.md §5.
export default function ProductBlocks() {
    return (
        <section id="product" className="scroll-mt-24">
            <div className="space-y-24 md:space-y-36">
                {FAMILIES.map((family) => (
                    <ProductBlock key={family.key} family={family} />
                ))}
            </div>
        </section>
    );
}

// Subtle rounded border + vignette that dissolves edges into the page
// (Linear-style — no background/glow added). Screenshots are 16:9.

// Discover/Journal: crop ~20% off the bottom (useful content is in the top 80%)
// and fade the bottom edge into the page.
const TOP_HEAVY = {
    aspect: "aspect-[20/9]", // 16:9 with the bottom 20% cropped (object-top)
    mask: "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
};

// Social: keep full height (heatmap is at the bottom); fade top + bottom.
const BOTTOM_HEAVY = {
    aspect: "aspect-video",
    mask: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%)",
};

function ProductBlock({ family }: { family: ProductFamily }) {
    const t = family.key === "social" ? BOTTOM_HEAVY : TOP_HEAVY;

    return (
        <div>
            {/* Header — title left, description + CTA right (Linear-style). */}
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-accent">
                        {family.name}
                    </p>
                    <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-[-0.01em] text-text-primary sm:text-3xl md:text-[40px]">
                        {family.tagline}
                    </h3>
                </div>

                <div className="lg:pt-2">
                    <p className="max-w-xl leading-relaxed text-text-muted">
                        {family.blurb}
                    </p>

                    {family.key === "journal" && (
                        <>
                            <div className="h-6" />
                            <p className="text-sm text-text-muted">
                                Works alongside your broker
                            </p>
                            <div className="h-3" />
                            <BrokerStripStatic />
                        </>
                    )}

                    <div className="h-6" />

                    <Link
                        href={family.href}
                        className="group inline-flex items-center gap-1 font-medium text-link no-underline!"
                    >
                        {family.ctaLabel}
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>

            {/* Screenshot — full content width, left-aligned. Subtle rounded
                border, no bg; one edge dissolves into the page via the mask. */}
            <div className="mt-10 w-full md:mt-14">
                {family.image ? (
                    // Muted border + small inner padding, so the screenshot sits
                    // inside the frame with a thin gap (Linear-style).
                    <div
                        className="w-full overflow-hidden rounded-md border border-white/[0.1]"
                        style={{ maskImage: t.mask, WebkitMaskImage: t.mask }}
                    >
                        <div
                            className={`relative w-full overflow-hidden rounded-sm ${t.aspect}`}
                        >
                            <Image
                                src={family.image}
                                alt={family.imageAlt}
                                fill
                                quality={90}
                                sizes="(max-width: 1440px) 100vw, 1312px"
                                // On mobile the full app shot is tiny, so zoom in
                                // (~1.5x) biased right of center — skips the left
                                // sidebar. Full image on desktop.
                                className="object-cover object-top scale-[1.5] origin-[65%_0%] lg:scale-100 lg:origin-top"
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className={`flex w-full items-center justify-center rounded-md border border-white/[0.06] ${t.aspect}`}
                    >
                        <span className="rounded-full border border-white/[0.06] bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-muted">
                            {family.placeholderLabel}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
