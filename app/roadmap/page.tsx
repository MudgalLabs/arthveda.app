import { Card, CardContent, CardTitle } from "@/ui/card";
import { Tag } from "@/ui/tag";

const roadmap = [
    {
        title: "Share Positions and Dashboards",
        icon: "👥",
        status: "Planned",
        description: `Share with your community or team.

- Share individual positions via public links.
- Share dashboard views (e.g. Intraday Tag Dashboard).
- Great for mentor-led groups, friends, or trade reviews.`,
    },
    {
        title: "Dashboards Views + Custom Widgets",
        icon: "📊",
        status: "Planned",
        description: `The heart of Arthveda. Flexible. Configurable. Personal.

Build and save tailored dashboards to suit your trading style:
- Create multiple saved views (e.g. Swing Dashboard, Calendar Dashboard).
- Add, resize, and reorder widgets.
- Configure each widget with filters (e.g. tags, dates, instruments).
`,
    },
    {
        title: "Visualize entries and exits on real market charts",
        icon: "📈",
        status: "Planned",
        description: `Enables richer visual journaling and trade review.`,
    },
    {
        title: "Brokers + Instruments (Driven by You)",
        icon: "🔌",
        status: "In Progress",
        description: `What you trade is what we build for.

Currently supported:
- Zerodha (1-Click Sync for today's trades)
- Excel Import: Zerodha, Upstox, Groww, Angel One, Kotak Securities.

Based on demand and paying user interest:
- More excel import and 1-click sync integrations for other brokers.
- Start Crypto with CoinDCX?`,
    },
    {
        title: "Weekly Summary Emails",
        icon: "📬",
        status: "Maybe",
        description: `Weekly trading summary.

- Key stats: PnL, win rate, best/worst trades.
- Nudges to journal or review mistakes.`,
    },
];

export default function RoadmapPage() {
    return (
        <div className="mt-12 md:mt-16 mb-12">
            <h1 className="page-header">{`What's`} next for Arthveda?</h1>

            <h2 className="mb-12 font-medium text-xl text-center">
                Here’s a look at the roadmap — driven by real trading pain
                points.
            </h2>

            <div className="relative space-y-10 border-l border-border ml-2">
                {roadmap.map((item, index) => (
                    <div key={index} className="pl-6 relative">
                        <div className="absolute left-[-9px] top-2 w-4 h-4 bg-primary rounded-full" />
                        <Card>
                            <CardTitle>
                                {item.icon} {item.title}
                            </CardTitle>

                            {/* <div className="text-xs inline-block px-2 py-0.5 rounded-md bg-zinc-800 text-blue-400 border border-blue-500 mb-2"> */}
                            <Tag
                                size="small"
                                className="mb-2"
                                variant="success"
                            >
                                {item.status}
                            </Tag>
                            {/* </div> */}

                            <CardContent>
                                <p className="text-gray-300 whitespace-pre-line text-sm md:text-base">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <p className="text-sm text-text-muted mt-16">
                Last updated: Oct 26, 2025
            </p>
        </div>
    );
}
