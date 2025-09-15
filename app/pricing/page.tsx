"use client";

import posthog from "posthog-js";
import {
    LucideBadgeCheck as IconBadgeCheck,
    LucideInfo as IconInfo,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";
import { Tag } from "@/ui/tag";
import { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/ui/table";
import { Tooltip } from "@/ui/tooltip";
import Link from "next/link";

export default function Pricing() {
    const [yearly, setYearly] = useState(true);
    const monthlyPrice = 199;
    const yearlyPricePerMonth = 99;

    const features = [
        {
            label: "Trade imports",
            free: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    Unlimited
                </div>
            ),
            pro: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    Unlimited
                </div>
            ),
        },
        {
            label: (
                <div className="flex-x">
                    Data & Insights
                    <Tooltip content="Includes dashboard, positions and calendar.">
                        <IconInfo size={14} />
                    </Tooltip>
                </div>
            ),
            free: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-accent" /> Past 1
                    year only
                </div>
            ),
            pro: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />
                    Full history
                </div>
            ),
        },
        {
            label: "Broker integrations",
            free: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    File import and daily sync
                </div>
            ),
            pro: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    File import and daily sync
                </div>
            ),
        },
        {
            label: (
                <div className="flex-x">
                    Broker accounts <BrokerAccountInfoTooltip />
                </div>
            ),
            free: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-accent" /> 2
                    accounts
                </div>
            ),
            pro: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    10 accounts
                </div>
            ),
        },
        {
            label: "Support",
            free: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    Normal
                </div>
            ),
            pro: (
                <div className="flex-x">
                    <IconBadgeCheck size={16} className="text-text-success" />{" "}
                    Priority
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="mt-12 md:mt-16 mb-12 text-center">
                <h1 className="mx-auto justify-center gap-x-2 gap-y-1 text-center text-3xl leading-tight font-medium sm:text-5xl md:gap-x-3.5 md:gap-y-2 md:text-7xl lg:font-semibold">
                    Two plans,{" "}
                    <span className="text-accent inline!">one purpose</span>
                </h1>

                <div className="bg-muted relative mx-auto mt-6 inline-flex w-fit items-center justify-center rounded-md p-1">
                    <button
                        onClick={() => setYearly(true)}
                        className={cn(
                            "rounded-md px-4 py-1 text-sm font-medium transition",
                            yearly
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        Yearly
                    </button>
                    <button
                        onClick={() => setYearly(false)}
                        className={cn(
                            "rounded-md px-4 py-1 text-sm font-medium transition",
                            !yearly
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        Monthly
                    </button>
                </div>

                <div className="flex-center mt-2 gap-x-1">
                    <Tag variant="success" size="small">
                        50% off
                    </Tag>
                    <span className="text-muted-foreground text-xs">
                        on yearly billing
                    </span>
                </div>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card className="relative flex h-60 flex-col justify-between">
                    <div>
                        <h3 className="heading mb-1">Free</h3>
                        <p className="text-muted-foreground mb-2 text-sm">
                            Ideal for hobbyists, beginners & curious minds.
                        </p>
                        <p className="text-text-primary absolute-center text-4xl font-bold">
                            ₹0
                            <span className="text-muted-foreground text-base font-medium">
                                /month
                            </span>
                        </p>
                    </div>
                    <a
                        href="https://web.arthveda.app"
                        className="unstyled-link hover:-translate-y-0.5 transition-transform"
                        onClick={() =>
                            posthog.capture("free_plan_clicked_on_pricing_page")
                        }
                    >
                        <Button
                            className="mt-4 w-full px-4 py-2"
                            variant="secondary"
                        >
                            {`Get started. It's free forever.`}
                        </Button>
                    </a>
                </Card>

                <Card className="relative flex h-60 flex-col justify-between">
                    <div>
                        <h3 className="heading mb-1">Pro</h3>
                        <p className="text-muted-foreground mx-auto text-sm">
                            Ideal for active traders who are performance-driven.
                        </p>
                        <p className="text-text-primary absolute-center text-4xl font-bold">
                            ₹{yearly ? yearlyPricePerMonth : monthlyPrice}
                            <span className="text-muted-foreground text-base font-medium">
                                /month
                            </span>
                        </p>
                    </div>

                    <div className="unstyled-link hover:-translate-y-0.5 transition-transform">
                        <p className="text-muted-foreground text-xs">
                            {yearly
                                ? `Billed yearly as ₹${
                                      yearlyPricePerMonth * 12
                                  }`
                                : "Billed monthly"}
                            . No refund once paid. Read our{" "}
                            <Link
                                className="cursor-pointer! text-xs!"
                                href="/refund"
                            >
                                refund policy
                            </Link>
                            .
                        </p>
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
                </Card>
            </div>

            <p className="text-muted-foreground mb-6 text-sm font-medium text-pretty!">
                💡{" "}
                <span className="text-foreground font-semibold">
                    Subscribe yearly
                </span>{" "}
                and lock in this price for a year. As Arthveda grows, prices may
                increase, but yours won’t.
            </p>

            {/* Mobile: Card version */}
            <div className="sm:hidden">
                <p className="text-center mb-4 text-text-muted">Free vs Pro</p>

                <p className="text-xs text-text-muted mb-2">
                    Pro includes everything from Free
                </p>
                <div className="space-y-4">
                    {features.map((row, i) => (
                        <Card key={i}>
                            <CardTitle className="font-medium mb-2 text-base">
                                {row.label}
                            </CardTitle>
                            <div className="flex flex-col gap-2 relative">
                                <div
                                    className="rounded px-2 py-1 flex items-center gap-2"
                                    style={{
                                        background: "var(--color-surface-1)",
                                        border: `1px solid var(--color-border)`,
                                    }}
                                >
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: "var(--color-success-foreground)",
                                        }}
                                    >
                                        Free
                                    </span>
                                    <span className="absolute left-16">
                                        {row.free}
                                    </span>
                                </div>
                                <div
                                    className="rounded px-2 py-1 flex items-center gap-2"
                                    style={{
                                        background: "var(--color-surface-1)",
                                        border: `1px solid var(--color-border)`,
                                    }}
                                >
                                    <span
                                        className="font-medium"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        Pro
                                    </span>
                                    <span className="absolute left-16">
                                        {row.pro}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <p className="text-muted-foreground mt-4 text-xs italic text-pretty!">
                    Unlimited = subject to fair usage. Abusive usage or bot
                    imports may be throttled.
                </p>
            </div>

            {/* Desktop/tablet: Table version */}
            <div className="hidden sm:block w-full overflow-x-auto">
                <Table className="min-w-[600px] text-sm">
                    <TableCaption>Free vs Pro</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-muted text-left">
                            <TableHead className="px-6 py-4 text-base font-semibold">
                                Feature
                            </TableHead>
                            <TableHead className="px-6 py-4 text-base font-semibold">
                                Free
                            </TableHead>
                            <TableHead className="px-6 py-4 text-base font-semibold">
                                <div className="flex-x items-baseline">
                                    Pro
                                    <p className="text-xs font-normal">
                                        (everything in Free)
                                    </p>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-muted/20 divide-y">
                        {features.map((row, i) => (
                            <TableRow
                                key={i}
                                className={i % 2 ? "bg-muted/5" : ""}
                            >
                                <TableCell className="px-6 py-3">
                                    {row.label}
                                </TableCell>
                                <TableCell className="px-6 py-3">
                                    {row.free}
                                </TableCell>
                                <TableCell className="px-6 py-3">
                                    {row.pro}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <p className="text-muted-foreground mt-4 text-xs italic">
                    Unlimited = subject to fair usage. Abusive usage or bot
                    imports may be throttled.
                </p>
            </div>

            <div className="h-4" />

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                    <span className="font-medium text-white">
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
