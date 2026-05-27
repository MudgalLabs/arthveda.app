import Image from "next/image";

interface FeatureCardProps {
    id: string;
    label: string;
    heading: string;
    subheading: string;
    image: string;
    priority?: boolean;
}

// Fade the screenshot into the page background on every edge (strongest at the
// bottom), so it dissolves into the surrounding space rather than sitting on a
// surface. The card itself has no background.
const FADE =
    "linear-gradient(to bottom, transparent 0%, #000 3%, #000 62%, transparent 100%), linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%)";

// One feature cell: a tall, background-less cell. The screenshot floats in the
// upper area (lit from the top, edges fading into the page) and the title +
// description sit at the bottom.
export default function FeatureCard({
    id,
    label,
    heading,
    subheading,
    image,
    priority = false,
}: FeatureCardProps) {
    return (
        <div
            id={id}
            className="group flex scroll-mt-24 flex-col p-4 md:min-h-[calc(100svh-10rem)] md:p-6"
        >
            {/* Subtle caption above the image (Linear-style). */}
            <p className="text-xs font-medium uppercase tracking-wider text-text-subtle">
                {label}
            </p>

            {/* Screenshot floats in the upper area. */}
            <div className="flex flex-1 items-center">
                <div className="relative aspect-[16/10] w-full">
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
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
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
