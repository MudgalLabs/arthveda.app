import {
    LucideBadgeCheck as IconBadgeCheck,
    LucideInfo as IconInfo,
} from "lucide-react";

import { formatCurrency, getUserTimezone } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Tooltip } from "@/ui/tooltip";
import Link from "next/link";
import { GetStarted } from "@/components/get_started";

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
                <h1 className="page-header">Powerful. Affordable.</h1>

                <p className="mt-4 font-medium text-xl">
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
                        <p className="text-text-muted mt-2 text-center text-sm">
                            (inclusive of{" "}
                            {isIndia ? "GST" : "VAT if applicable"})
                        </p>
                    </div>

                    <div className="mt-4">
                        <GetStarted />
                    </div>

                    <div className="mt-8">
                        {FEATURES.map((feature, index) => (
                            <div key={index} className="mb-2 flex items-center">
                                <IconBadgeCheck className="text-text-success mr-2 size-4" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </Card>

                <p className=" mt-4">
                    Read our{" "}
                    <Link className="cursor-pointer! text-base!" href="/refund">
                        refund policy
                    </Link>
                    .
                </p>
            </div>

            <div className="mt-8 text-center">
                <p className="">
                    Arthveda is growing every month.{" "}
                    <Link href="/roadmap" className="text-base!">
                        See what’s coming →
                    </Link>
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
