"use client";

import posthog from "posthog-js";
import {
    LucideBadgeCheck as IconBadgeCheck,
    LucideInfo as IconInfo,
} from "lucide-react";

import { formatCurrency, getUserTimezone } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Tooltip } from "@/ui/tooltip";
import Link from "next/link";

const FEATURES = [
    "Journal unlimited positions via import or manual entry",
    "Analytics and insights",
    // eslint-disable-next-line react/jsx-key
    <p className="flex-x">
        Import and sync from upto 10 broker accounts{" "}
        <BrokerAccountInfoTooltip />
    </p>,
    "Priority customer support",
    "Access to all new features as we launch them",
];

export default function Pricing() {
    const tz = getUserTimezone();
    const isIndia = tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
    const yearlyPrice = isIndia ? 1500 : 50;
    const currency = isIndia ? "inr" : "usd";

    return (
        <div>
            <div className="mt-12 md:mt-16 mb-12 text-center">
                <h1 className="mx-auto justify-center gap-x-2 gap-y-1 text-center text-3xl leading-tight font-medium sm:text-5xl md:gap-x-3.5 md:gap-y-2 md:text-7xl lg:font-semibold text-accent">
                    Powerful & Affordable
                </h1>

                <p className="mt-4 font-medium">
                    We provide a 14-day, no questions asked, money-back
                    guarantee!
                </p>
            </div>

            <div className="w-full max-w-md mx-auto mb-10">
                <Card className="">
                    <div>
                        {/* <h3 className="heading">Subscribe to Arthveda</h3> */}
                        <p className="text-text-primary text-center text-4xl font-bold mt-4">
                            {formatCurrency(yearlyPrice, { currency })}
                            <span className="text-muted-foreground text-base font-medium">
                                /year
                            </span>
                        </p>
                        <p className="text-text-muted mt-2 text-center text-xs">
                            (inclusive of{" "}
                            {isIndia ? "GST" : "VAT if applicable"})
                        </p>
                    </div>

                    <div className="unstyled-link hover:-translate-y-0.5 transition-transform">
                        <a
                            href="https://web.arthveda.app"
                            onClick={() =>
                                posthog.capture(
                                    "pro_plan_clicked_on_pricing_page"
                                )
                            }
                            className="unstyled-link"
                        >
                            <Button
                                className="mt-4 px-4 py-2 w-full"
                                variant="primary"
                            >
                                Get started
                            </Button>
                        </a>
                    </div>

                    <div className="mt-8">
                        {FEATURES.map((feature, index) => (
                            <div
                                key={index}
                                className="mb-2 flex items-center text-sm"
                            >
                                <IconBadgeCheck className="text-text-success mr-2 size-4" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </Card>

                <p className="text-muted-foreground text-sm mt-2">
                    Read our{" "}
                    <Link className="cursor-pointer! text-sm!" href="/refund">
                        refund policy
                    </Link>
                    .
                </p>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                    <span className="text-text-primary">
                        Arthveda is growing every month.
                    </span>{" "}
                    <Link href="/roadmap">See what’s coming →</Link>
                </p>
            </div>
        </div>
    );
}

function BrokerAccountInfoTooltip() {
    return (
        <Tooltip
            content={
                <>
                    <p>
                        Broker account represents your account with a broker
                        (e.g., Zerodha - Personal).
                    </p>
                    <p>
                        Positions you import or sync are to be associated to a
                        broker account.
                    </p>
                </>
            }
        >
            <IconInfo size={14} />
        </Tooltip>
    );
}
