"use client";

import posthog from "posthog-js";

import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

export const GetStarted = ({ shortened }: { shortened?: boolean }) => {
    return (
        <div className="flex-center flex-col">
            <a
                href="https://web.arthveda.app"
                onClick={() =>
                    posthog.capture("Clicked on try Arthveda free for 30 days")
                }
                // className="unstyled-link hover:-translate-y-0.5 transition-transform"
            >
                <Button
                    className={cn(
                        "font-moniker font-bold arrow-button text-sm py-3 px-4 sm:text-xl sm:py-5 sm:px-6",
                        {
                            "text-sm sm:text-base!": shortened,
                        }
                    )}
                >
                    TRY ARTHVEDA FREE {!shortened && "FOR 30-DAYS"}
                </Button>
            </a>
        </div>
    );
};
