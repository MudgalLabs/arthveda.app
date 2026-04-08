"use client";

import posthog from "posthog-js";
import { ArrowRight as IconRight } from "lucide-react";

export const GetStarted = () => {
    return (
        <div className="flex-center flex-col">
            <a
                href="https://web.arthveda.app"
                onClick={() =>
                    posthog.capture("Clicked on try Arthveda free for 30 days")
                }
            >
                <div className="relative inline-block">
                    <div className="absolute inset-0 blur-lg bg-accent/20 rounded-xl" />
                    <button className="group flex-x relative overflow-hidden text-text-primary px-5 py-2.5 rounded-md font-semibold text-base border border-white/10 transition-all duration-500 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_40px_rgba(80,120,255,0.35)] before:absolute before:inset-0 before:bg-black/10 before:rounded-md">
                        {/* Base gradient */}
                        <span className="absolute inset-0 brand-gradient-bg" />

                        {/* Purple hover gradient */}
                        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(135deg,#6f6bff_0%,#5b7cff_50%,#4c8dff_100%)]" />

                        {/* Content */}
                        <span className="relative z-10 flex-x">
                            Start free <IconRight size={18} strokeWidth={2.5} />
                        </span>
                    </button>
                </div>
            </a>
        </div>
    );
};
