"use client";

import posthog from "posthog-js";

import { Button } from "@/ui/button";

export const GetStarted = () => {
    return (
        <div className="flex-center flex-col">
            <a
                href="https://web.arthveda.app"
                onClick={() => posthog.capture("Clicked Get Started")}
                // className="unstyled-link hover:-translate-y-0.5 transition-transform"
            >
                <Button className="font-moniker font-bold arrow-button text-sm py-3 px-4 sm:text-xl sm:py-5 sm:px-6">
                    {/* Get started */}
                    TRY ARTHVEDA FREE FOR 30-DAYS
                </Button>
            </a>

            <div className="h-4" />

            <span className=" text-xs sm:text-base text-text-muted italic font-moniker">
                No credit card required.
            </span>
        </div>
    );
};
