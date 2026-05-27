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
}: LitMediaProps) {
    return (
        <div className="relative left-1/2 w-[calc(100vw-16px)] max-w-[1920px] -translate-x-1/2 overflow-hidden rounded-xl px-2 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-28">
            {/* Lit backdrop: top edge = page bg, bottom = brand glow. */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(95% 100% at 50% 100%, rgba(5,7,15,0) 0%, rgba(5,7,15,0.85) 100%), linear-gradient(180deg, #05070f 0%, var(--color-primary) 88%)",
                }}
            />

            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: GRAIN }}
            />

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
                // Always full 16:9 (no crop): width = the smaller of 1500px or
                // the width whose 16:9 height = viewport − nav − small padding.
                // So it fills the height when it can, and scales down (not crops)
                // when the viewport is short. max-w-full guards narrow viewports.
                className="relative z-10 mx-auto w-[min(1500px,calc((100svh_-_5.5rem)*16/9))] max-w-full rounded-md border-white/[0.1] shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            />
        </div>
    );
}
