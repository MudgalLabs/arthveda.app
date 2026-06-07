import MediaFrame from "@/components/media_frame";

interface LitMediaProps {
    src?: string | null;
    alt?: string;
    placeholderLabel?: string;
    priority?: boolean;
    /** Inner frame aspect — "aspect-video" (hero/video) or "aspect-[16/10]". */
    aspectClassName?: string;
    /** Optional autoplay flow-loop video (poster = `src`). */
    videoSrc?: string;
    videoSrcWebm?: string;
    /** Homepage is bottom-lit; broker pages use the Linear-style top-lit stage. */
    lightOrigin?: "top" | "bottom";
    /** Fade the lower edge of the whole stage into the page background. */
    bottomFade?: boolean;
    /** Homepage hero is full-bleed; product/broker sections stay in content width. */
    fullBleed?: boolean;
    /** Override the default floating media sizing. */
    frameClassName?: string;
    captionTitle?: string;
    captionDescription?: string;
}

// Film grain that textures the lit backdrop (Linear overlays at .08).
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// The "lit stage" media treatment: a full-bleed backdrop (page-bg → brand glow
// at the bottom) + grain, with the screenshot floating in front as a single
// shell (the MediaFrame's own rounded border) + content — no extra panel.
// Used by the hero video card, trialled on the Social product section, and
// (later) every /product feature image.
export default function LitMedia({
    src,
    alt = "",
    placeholderLabel,
    priority = false,
    aspectClassName = "aspect-video",
    videoSrc,
    videoSrcWebm,
    lightOrigin = "bottom",
    bottomFade = false,
    fullBleed = true,
    frameClassName,
    captionTitle,
    captionDescription,
}: LitMediaProps) {
    const stageBackground =
        lightOrigin === "top"
            ? "radial-gradient(95% 100% at 50% 0%, color-mix(in oklab, var(--color-primary) 42%, transparent) 0%, color-mix(in oklab, var(--color-accent) 24%, transparent) 42%, rgba(5,7,15,0) 78%), linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 24%, var(--color-surface-4) 48%) 0%, color-mix(in oklab, var(--color-background) 90%, transparent) 72%, var(--color-background) 100%)"
            : "radial-gradient(95% 100% at 50% 100%, rgba(5,7,15,0) 0%, rgba(5,7,15,0.85) 100%), linear-gradient(180deg, #05070f 0%, var(--color-primary) 88%)";

    return (
        <div
            className={
                fullBleed
                    ? "relative left-1/2 w-[calc(100vw-16px)] max-w-[1920px] -translate-x-1/2 overflow-hidden rounded-xl px-2 pt-8 pb-10 sm:px-6 sm:pt-12 sm:pb-28"
                    : "relative w-full overflow-hidden rounded-lg border border-white/[0.1] px-2 py-6 sm:px-6"
            }
        >
            {/* Lit backdrop: homepage glows upward; broker pages can flip it. */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: stageBackground }}
            />

            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: GRAIN }}
            />

            {bottomFade && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent 0%, transparent 70%, color-mix(in oklab, var(--color-background) 72%, transparent) 88%, var(--color-background) 100%)",
                    }}
                />
            )}

            {/* The screenshot — single shell (MediaFrame's rounded border) +
                content, floating on the lit floor with a big drop shadow. */}
            <MediaFrame
                src={src}
                alt={alt}
                placeholderLabel={placeholderLabel}
                priority={priority}
                aspectClassName={aspectClassName}
                videoSrc={videoSrc}
                videoSrcWebm={videoSrcWebm}
                showPlay={Boolean(videoSrc)}
                spotlight
                bottomFade={bottomFade}
                className={
                    frameClassName ??
                    "relative z-10 mx-auto w-[min(1500px,calc((100svh_-_5.5rem)*16/9))] max-w-full rounded-md border-white/[0.1] shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                }
            />

            {(captionTitle || captionDescription) && (
                <div className="relative z-30 mt-6 max-w-2xl px-2 pb-1 sm:px-0">
                    {captionTitle && (
                        <p className="font-heading text-[15px] font-medium leading-6 text-text-primary">
                            {captionTitle}
                        </p>
                    )}
                    {captionDescription && (
                        <p className="mt-1 max-w-xl font-content text-[15px] leading-6 text-text-muted">
                            {captionDescription}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
