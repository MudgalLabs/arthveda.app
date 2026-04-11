import { Broker, BROKERS } from "@/lib/brokers";
import { Card, CardContent, CardTitle } from "@/ui/card";
import { Tag } from "@/ui/tag";
import { Check } from "lucide-react";

export default function BrokersPage() {
    return (
        <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
            <h1 className="page-header">Works with your broker.</h1>

            <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                Import your trades from supported brokers in seconds — no manual
                work needed.
            </p>

            <div className="h-16" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {BROKERS.map(
                    (b) =>
                        !b.isComingSoon && (
                            <BrokerCard key={b.name} broker={b} />
                        ),
                )}
            </div>
        </div>
    );
}

function BrokerCard({ broker }: { broker: Broker }) {
    return (
        <Card className="group p-4 text-left">
            {/* Header */}
            <CardTitle className="flex items-center gap-3 mb-4">
                {/* <Image
                    src={broker.svg}
                    alt={broker.name}
                    width={96}
                    height={32}
                /> */}
                <h3>{broker.name}</h3>
            </CardTitle>

            <CardContent className="space-y-4">
                {/* Instruments */}
                <div className="flex flex-wrap gap-2">
                    {broker.instruments.map((type) => (
                        <Tag key={type} variant="muted" size="small">
                            {type.toUpperCase()}
                        </Tag>
                    ))}
                </div>

                {/* Import Types (PRIMARY) */}
                <div className="flex flex-wrap gap-4">
                    {broker.importTypes.map((type) => (
                        <div key={type} className="flex-x gap-x-1 items-center">
                            <span>
                                <Check size={14} />
                            </span>
                            <span>
                                {type === "auto" && "Auto sync"}
                                {type === "today" && "Sync today"}
                                {type === "file" && "File upload"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Coming Soon */}
                {/* {broker.isComingSoon && (
                    <div className=" text-xs text-accent">Coming soon</div>
                )} */}
            </CardContent>
        </Card>
    );
}
