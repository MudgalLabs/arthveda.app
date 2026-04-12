"use client";

import posthog from "posthog-js";
import { ArrowRight as IconRight } from "lucide-react";
import { Button } from "@/ui/button";

interface GetStartedProps {
    shortened?: boolean;
}

export const GetStarted = ({ shortened = false }: GetStartedProps) => {
    return (
        <div>
            <a
                href="https://web.arthveda.app"
                onClick={() =>
                    posthog.capture("Clicked on try Arthveda free for 30 days")
                }
            >
                <Button size="large">
                    <span className="relative z-10 flex-x">
                        {shortened
                            ? "Start for free"
                            : "Start improving your trades"}
                        <IconRight size={16} strokeWidth={2.5} />
                    </span>
                </Button>
            </a>

            {!shortened && (
                <>
                    <div className="h-4" />

                    <p className="text-text-muted text-xs">
                        30-day free trial. No credit card required.
                    </p>
                </>
            )}
        </div>
    );
};
