"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface MediaFrameProps {
    /** Poster image src, or null to render a styled placeholder. */
    src?: string | null;
    alt?: string;
    /** Caption shown under the play button / inside the placeholder. */
    placeholderLabel?: string;
    /** Render a centered play button (click-to-play video). */
    showPlay?: boolean;
    /** Video sources. WebM is preferred when present; MP4 is the fallback. */
    videoSrc?: string;
    videoSrcWebm?: string;
    /**
     * MIME types for the sources. Pass the codecs (e.g. AV1 in WebM) so a
     * browser that can't decode them skips to the next source instead of
     * failing on it (Safari without AV1 hardware does exactly that).
     */
    videoType?: string;
    videoTypeWebm?: string;
    /**
     * Autoplay the video (muted, looping) instead of click-to-play — used for
     * the hero flow-loop. The poster (`src`) is the LCP paint; the video streams
     * in after and plays. Respects prefers-reduced-motion (stays on the poster).
     */
    autoPlay?: boolean;
    priority?: boolean;
    /** Aspect-ratio utility for the frame. Default 16:9. */
    aspectClassName?: string;
    /** Overlay a top-down spotlight over the cover (matches the product images). */
    spotlight?: boolean;
    /** Fade the frame itself into its parent at the bottom. */
    bottomFade?: boolean;
    className?: string;
}

// A dark frame used for every homepage visual. Renders a real screenshot/video
// when available, otherwise an obvious-but-on-brand placeholder.
export default function MediaFrame({
    src,
    alt = "",
    placeholderLabel,
    showPlay = false,
    videoSrc,
    videoSrcWebm,
    videoType = "video/mp4",
    videoTypeWebm = "video/webm",
    autoPlay = false,
    priority = false,
    aspectClassName = "aspect-video",
    spotlight = false,
    bottomFade = false,
    className,
}: MediaFrameProps) {
    const [clicked, setClicked] = useState(false);
    // Autoplay hero: mirrors the <video> element so the toggle shows the right icon.
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Autoplay only when motion is allowed — drive it via JS (not the autoPlay
    // attribute) so prefers-reduced-motion cleanly leaves the poster showing.
    useEffect(() => {
        if (!autoPlay || !videoSrc) return;
        const v = videoRef.current;
        if (!v) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        v.play().catch(() => {});
    }, [autoPlay, videoSrc]);

    const renderVideoSources = () => (
        <>
            {videoSrcWebm && <source src={videoSrcWebm} type={videoTypeWebm} />}
            {videoSrc && <source src={videoSrc} type={videoType} />}
        </>
    );

    return (
        <div
            className={cn(
                "group/media relative w-full overflow-hidden rounded-xl",
                aspectClassName,
                "border border-border-subtle bg-surface-1",
                "shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
                className,
            )}
            style={
                bottomFade
                    ? {
                          maskImage:
                              "linear-gradient(to bottom, #000 0%, #000 66%, rgba(0,0,0,0.62) 78%, transparent 100%)",
                          WebkitMaskImage:
                              "linear-gradient(to bottom, #000 0%, #000 66%, rgba(0,0,0,0.62) 78%, transparent 100%)",
                      }
                    : undefined
            }
        >
            {autoPlay && videoSrc ? (
                // Hero loop: autoplay, no controls, no play button. The poster
                // is also rendered as an optimized priority <Image> underneath,
                // so it stays the LCP paint; the video covers it once playing.
                <>
                    {src && (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            quality={90}
                            sizes="(max-width: 1024px) 100vw, 1500px"
                            priority={priority}
                            className="object-cover"
                        />
                    )}
                    <video
                        ref={videoRef}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label={alt}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        {renderVideoSources()}
                    </video>
                    {/* Pause/play (WCAG 2.2.2: moving content over 5s needs a
                        pause). Faint until the frame is hovered; always reachable
                        by keyboard. No scrubber: a seamless loop has no real
                        start or end to seek between. */}
                    <button
                        type="button"
                        aria-label={playing ? "Pause video" : "Play video"}
                        onClick={() => {
                            const v = videoRef.current;
                            if (!v) return;
                            if (v.paused) v.play().catch(() => {});
                            else v.pause();
                        }}
                        className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-text-primary ring-1 ring-white/15 backdrop-blur-md opacity-50 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 group-hover/media:opacity-100 sm:right-4 sm:bottom-4"
                    >
                        {playing ? (
                            <Pause size={15} className="fill-current" />
                        ) : (
                            <Play size={15} className="translate-x-px fill-current" />
                        )}
                    </button>
                </>
            ) : clicked && videoSrc ? (
                <video
                    poster={src ?? undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    {renderVideoSources()}
                </video>
            ) : (
                <>
                    {src ? (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            quality={90}
                            sizes="(max-width: 1024px) 100vw, 1500px"
                            priority={priority}
                            className="object-cover object-top"
                        />
                    ) : (
                        <>
                            {/* Subtle glow + grid so the placeholder feels intentional. */}
                            <div
                                className="absolute inset-0 opacity-60"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 50% 35%, rgba(99,102,241,0.18), transparent 60%)",
                                }}
                            />
                            <div
                                className="absolute inset-0 opacity-[0.08]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                                    backgroundSize: "44px 44px",
                                }}
                            />
                        </>
                    )}

                    {/* Top-down spotlight over the cover. */}
                    {spotlight && (
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(60% 55% at 50% 0%, rgba(150,163,255,0.18), transparent 70%)",
                            }}
                        />
                    )}

                    {/* Play button (centered) + caption stacked below it. */}
                    {showPlay && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <button
                                type="button"
                                aria-label="Play walkthrough"
                                onClick={() => videoSrc && setClicked(true)}
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-background/70 ring-1 ring-white/20 backdrop-blur-md transition-transform duration-200 hover:scale-105"
                            >
                                <Play
                                    size={26}
                                    className="translate-x-0.5 fill-text-primary text-text-primary"
                                />
                            </button>

                            {placeholderLabel && (
                                <span className="rounded-full border border-border-subtle bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-muted backdrop-blur-sm">
                                    {placeholderLabel}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Caption for non-play placeholders (product blocks). */}
                    {!showPlay && !src && placeholderLabel && (
                        <span className="absolute inset-0 m-auto flex h-fit w-fit items-center justify-center rounded-full border border-border-subtle bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-muted backdrop-blur-sm">
                            {placeholderLabel}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
