import {
    LucideBadgeCheck as IconBadgeCheck,
    LucideInfo as IconInfo,
} from "lucide-react";

import { Card } from "@/ui/card";
import { Tooltip } from "@/ui/tooltip";
import Link from "next/link";
import { GetStarted } from "@/components/get_started";
import { PricingCost } from "@/app/pricing/pricing_cost";

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
    return (
        <div>
            <div className="mt-12 md:mt-16 mb-12 text-center">
                <h1 className="page-header">Powerful. Affordable.</h1>

                <p className="mt-4 font-reallysans font-medium text-3xl">
                    All features. One price. Unlimited potential.
                </p>
            </div>

            <div className="w-full max-w-md mx-auto mb-10">
                <Card className="">
                    <PricingCost />

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
