"use client";

import posthog from "posthog-js";
import { ArrowRight as IconRight } from "lucide-react";
import { Button } from "@/ui/button";

interface GetStartedProps {
    shortened?: boolean;
}

export const GetStarted = ({ shortened = false }: GetStartedProps) => {
    return (
        <div className="flex-center flex-col">
            <a
                href="https://web.arthveda.app"
                onClick={() =>
                    posthog.capture("Clicked on try Arthveda free for 30 days")
                }
            >
                <Button size="large">
                    <span className="relative z-10 flex-x">
                        {shortened ? "Start free" : "See your insights"}
                        <IconRight size={16} strokeWidth={2} />
                    </span>
                </Button>
            </a>
        </div>
    );
};
