import Image from "next/image";
import Link from "next/link";

import { FAMILIES, FAMILY_ICONS, type ProductFamily } from "@/lib/families";
import { BrokerStripStatic } from "@/components/brokers";
import { FamilyLabel } from "@/components/family_label";

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

// Lighting treatment shared with the product feature cards: a top-down spotlight
// plus a mask that fades the screenshot into the page on every edge (lightly on
// the top/sides, harder at the bottom). Screenshots are 16:9.
const SPOTLIGHT =
    "radial-gradient(60% 55% at 50% 0%, rgba(150,163,255,0.18), transparent 70%)";
const SIDE_FADE =
    "linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%)";

// Discover/Journal: content lives in the top ~80%, so fade the bottom hard.
const TOP_HEAVY = {
    aspect: "aspect-[20/9]", // 16:9 with the bottom cropped (object-top)
    mask: `linear-gradient(to bottom, transparent 0%, #000 4%, #000 68%, transparent 100%), ${SIDE_FADE}`,
};

// Social: heatmap sits lower, so keep more of the bottom; fade top + sides.
const BOTTOM_HEAVY = {
    aspect: "aspect-video",
    mask: `linear-gradient(to bottom, transparent 0%, #000 12%, #000 86%, transparent 100%), ${SIDE_FADE}`,
};

function ProductBlock({ family }: { family: ProductFamily }) {
    const t = family.key === "social" ? BOTTOM_HEAVY : TOP_HEAVY;

    return (
        <div>
            {/* Header — title left, description + CTA right (Linear-style). */}
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
                <div>
                    <FamilyLabel name={family.name} Icon={FAMILY_ICONS[family.key]} />
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

            {/* Screenshot — full content width, left-aligned. No frame: a
                top-down spotlight + edge mask dissolve it into the page. */}
            <div className="relative mt-10 w-full md:mt-14">
                {family.image ? (
                    <>
                        <div
                            className={`relative w-full overflow-hidden ${t.aspect}`}
                            style={{
                                maskImage: t.mask,
                                WebkitMaskImage: t.mask,
                                maskComposite: "intersect",
                                WebkitMaskComposite: "source-in",
                            }}
                        >
                            <Image
                                src={family.image}
                                alt={family.imageAlt}
                                fill
                                quality={90}
                                sizes="(max-width: 1440px) 100vw, 1312px"
                                // Same framing at every size — object-cover from
                                // the top. (No mobile zoom: it cropped the shot
                                // too hard and read as a weird close-up.)
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Top-down spotlight. */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{ background: SPOTLIGHT }}
                        />
                    </>
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
