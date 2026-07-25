import Image from "next/image";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
    id?: string;
    label: string;
    heading: string;
    subheading: string;
    /** Screenshot path, or null to render a styled placeholder frame. */
    image: string | null;
    /** Short label shown inside the placeholder when `image` is null. */
    placeholderLabel?: string;
    priority?: boolean;
    /** Frame aspect ratio. Defaults to 16:10, which fits most tight crops. A
        card whose screenshot is a different shape overrides this so `object-cover`
        doesn't clip its edges (e.g. a 16:9 shot would lose its left/right on the
        default 16:10 frame). */
    aspectClass?: string;
    /** Extra classes merged onto the <Image> (via cn/tailwind-merge, so they win
        over the defaults). Use to re-anchor or zoom a specific screenshot, e.g.
        `object-left-top origin-top-left scale-[1.2]`. */
    imageClassName?: string;
}

// Fade the screenshot into the page background on every edge so it dissolves
// into the surrounding space rather than sitting on a surface. The card itself
// has no background. The feature images are tight crops with content close to
// every edge, so the fade is gentle (a thin dissolve, ~2% sides/top, ~12%
// bottom) rather than a heavy vignette that would eat into the screenshot.
const FADE =
    "linear-gradient(to bottom, transparent 0%, #000 2%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 2%, #000 98%, transparent 100%)";

// One feature cell: a tall, background-less cell. The screenshot floats in the
// upper area (lit from the top, edges fading into the page) and the title +
// description sit at the bottom.
export default function FeatureCard({
    id,
    label,
    heading,
    subheading,
    image,
    placeholderLabel,
    priority = false,
    aspectClass = "aspect-[16/10]",
    imageClassName,
}: FeatureCardProps) {
    return (
        <div id={id} className="group flex scroll-mt-28 flex-col px-4 pb-4 pt-2.5 md:min-h-[calc(100svh-10rem)] md:p-6">

            {/* Subtle caption above the image (Linear-style). */}
            <p className="text-xs font-medium uppercase tracking-wider text-text-subtle">
                {label}
            </p>

            {/* Screenshot floats in the upper area. On mobile a gap separates it
                from the eyebrow (the eyebrow itself sits close to the top edge);
                on md+ the image is vertically centered in the tall card. */}
            <div className="mt-6 flex flex-1 items-center md:mt-0">
                <div className={`relative ${aspectClass} w-full`}>
                    {image ? (
                        <>
                            {/* Masked image — fades into the background on all edges. */}
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    maskImage: FADE,
                                    WebkitMaskImage: FADE,
                                    maskComposite: "intersect",
                                    WebkitMaskComposite: "source-in",
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={heading}
                                    fill
                                    quality={90}
                                    sizes="(max-width: 768px) 100vw, 660px"
                                    priority={priority}
                                    className={cn(
                                        "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none",
                                        imageClassName
                                    )}
                                />
                            </div>

                            {/* Spotlight from the top of the image. */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(60% 55% at 50% 0%, rgba(150,163,255,0.18), transparent 70%)",
                                }}
                            />
                        </>
                    ) : (
                        /* Placeholder frame until the screenshot is captured. */
                        <div className="absolute inset-0 flex items-center justify-center rounded-md border border-white/[0.06]">
                            <span className="rounded-full border border-white/[0.06] bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-muted">
                                {placeholderLabel ?? label}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Title + description, at the bottom. Linear's caption type: 15px,
                medium-weight heading + muted paragraph. */}
            <div className="mt-8">
                <h3 className="text-[15px] font-medium leading-6 text-text-primary">
                    {heading}
                </h3>
                <p className="mt-1.5 max-w-md text-[15px] leading-6 text-text-muted">
                    {subheading}
                </p>
            </div>
        </div>
    );
}
