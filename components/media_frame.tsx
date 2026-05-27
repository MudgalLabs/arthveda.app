"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

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
    autoPlay = false,
    priority = false,
    aspectClassName = "aspect-video",
    spotlight = false,
    className,
}: MediaFrameProps) {
    const [clicked, setClicked] = useState(false);
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
            {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </>
    );

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-xl",
                aspectClassName,
                "border border-border-subtle bg-surface-1",
                "shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
                className,
            )}
        >
            {autoPlay && videoSrc ? (
                // Hero flow-loop: autoplay, no controls, no play button.
                <video
                    ref={videoRef}
                    poster={src ?? undefined}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    {renderVideoSources()}
                </video>
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
                            sizes="(max-width: 1024px) 100vw, 1200px"
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
