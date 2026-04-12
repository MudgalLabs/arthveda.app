import { Check } from "lucide-react";

import { Card, CardTitle } from "@/ui/card";
import { Tag } from "@/ui/tag";
import { cn } from "@/lib/utils";

type Step = {
    label: string;
    title: string;
    points: string[];
};

const steps: Step[] = [
    {
        label: "Today",
        title: "See what’s actually happening",
        points: [
            "Import your trades",
            "See your real performance",
            "Stop guessing",
        ],
    },
    {
        label: "Week 1",
        title: "Find your mistakes",
        points: [
            "See why you're losing money",
            "Spot patterns in bad trades",
            "Understand what’s hurting you",
        ],
    },
    {
        label: "Month 1",
        title: "Fix your trading",
        points: [
            "Eliminate repeat mistakes",
            "Double down on what works",
            "Trade with consistency",
        ],
    },
];

export default function ImprovementTimeline() {
    return (
        <section>
            <div className="text-center mb-8 sm:mb-24 md:mb-32">
                <h3 className="section-header mx-auto leading-tight">
                    This is how your trading improves with Arthveda
                </h3>

                <p className="text-text-muted mt-3">
                    Most traders don’t improve because they don’t know what to
                    fix.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-0">
                <div className="hidden md:block relative mb-14 w-[75%] mx-auto">
                    {/* Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border-soft -translate-y-1/2" />

                    <div className="relative flex justify-between items-center">
                        {steps.map((step, i) => (
                            <div
                                key={step.label}
                                className="flex flex-col items-center"
                            >
                                <Tag
                                    variant={i === 2 ? "primary" : "muted"}
                                    className={cn("absolute w-20 -top-12", {
                                        "font-medium text-base": i === 2,
                                    })}
                                >
                                    {step.label}
                                </Tag>

                                <div>
                                    <div
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-full bg-text-muted  shadow-sm",
                                            {
                                                "bg-accent border-accent w-3.5 h-3.5":
                                                    i === 2,
                                            },
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:hidden relative mb-10">
                    {/* Vertical line */}
                    <div className="relative space-y-12">
                        <div className="absolute left-4 top-2 bottom-0 h-[calc(67%+42px)] w-0.5 bg-border-soft" />

                        {steps.map((step, i) => (
                            <div key={step.label} className="relative pl-10">
                                {/* Dot */}
                                <div
                                    className={cn(
                                        "absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-text-muted",
                                        {
                                            "bg-accent font-bold w-3.5 h-3.5 left-2.5":
                                                i === 2,
                                        },
                                    )}
                                />

                                {/* Tag */}
                                <Tag
                                    variant={i === 2 ? "primary" : "muted"}
                                    className={cn("mb-3", {
                                        "font-medium text-base": i === 2,
                                    })}
                                >
                                    {step.label}
                                </Tag>

                                {/* Card */}
                                <Card className="px-4 py-6">
                                    <h4 className="text-sm font-semibold text-text-primary">
                                        {step.title}
                                    </h4>

                                    <ul className="mt-3 space-y-2">
                                        {step.points.map((point) => (
                                            <li
                                                key={point}
                                                className="text-sm text-text-muted flex-x"
                                            >
                                                <Check size={16} />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden md:grid gap-4 md:grid-cols-3">
                    {steps.map((step) => (
                        <Card key={step.title} className="px-6 py-8">
                            <CardTitle className="md:hidden mb-2">
                                {step.label}
                            </CardTitle>

                            <h4 className="text-sm font-semibold text-text-primary">
                                {step.title}
                            </h4>

                            <ul className="mt-3 space-y-2">
                                {step.points.map((point) => (
                                    <li
                                        key={point}
                                        className="text-sm text-text-muted flex items-start gap-2"
                                    >
                                        <Check size={18} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
