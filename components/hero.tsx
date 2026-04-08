import Image from "next/image";

import { GetStarted } from "@/components/get_started";
import { BrokerStrip } from "@/components/brokers";

export default function Hero() {
    return (
        <div className="mt-16 md:mt-24">
            <div className="md:px-4 xl:px-0 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* LEFT */}
                <div className="text-center lg:text-left">
                    <h1 className="font-heading text-text-primary text-[36px] sm:text-[52px] md:text-[60px] font-semibold leading-[1.05] tracking-[-0.02em]">
                        You don’t know what’s actually driving your trading
                        results.
                    </h1>

                    <div className="h-6" />

                    <h2 className="font-content text-text-primary text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Arthveda shows you what’s working, what’s hurting, and
                        how to fix it — based on your own trades.
                    </h2>

                    <div className="h-4" />

                    <p className="font-content text-text-muted text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                        The patterns, habits, and blind spots your spreadsheets
                        never reveal.
                    </p>

                    <div className="h-10" />

                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <GetStarted />

                        <p className="text-text-muted text-sm">
                            No credit card required.
                        </p>

                        <p className="text-text-muted text-sm">
                            500+ traders · 75,000+ trades analyzed
                        </p>
                    </div>
                </div>

                <div
                    className="relative w-full hidden lg:flex items-center"
                    style={{
                        background:
                            "radial-gradient(circle at 75% 45%, rgba(99,102,241,0.12), transparent 60%)",
                    }}
                >
                    <div className="relative w-full h-[520px]">
                        {/* PNL CURVE */}
                        <Image
                            src="/images/pnl-curve.png"
                            alt="PnL curve"
                            width={1200}
                            height={800}
                            className="absolute top-[2%] right-[2%] w-[85%] h-auto rounded-sm border border-border-subtle z-2"
                            priority
                        />

                        {/* NOTES (LEFT OVERLAY — mid height of PnL) */}
                        <Image
                            src="/images/notes.png"
                            alt="Trade notes"
                            width={800}
                            height={600}
                            className="absolute top-[42%] left-[2%] w-[320px] h-auto rounded-sm opacity-80 z-1"
                        />

                        {/* BOTTOM RIGHT STACK */}
                        <div className="absolute bottom-[12%] right-[0%] flex flex-col gap-2 items-end">
                            <Image
                                src="/images/insight-losing-window.png"
                                alt="Losing window insight"
                                width={600}
                                height={400}
                                className="w-[320px] h-auto rounded-sm z-3"
                            />

                            <Image
                                src="/images/insight-overtrade.png"
                                alt="Overtrading insight"
                                width={600}
                                height={400}
                                className="w-[280px] h-auto rounded-sm opacity-90 z-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 w-full">
                <div className="flex flex-col sm:flex-x! items-start sm:items-center h-full">
                    <span className="text-xs text-text-muted sm:px-3 sm:py-1 w-48 leading-none sm:leading-normal">
                        Brokers supported:
                    </span>
                    <BrokerStrip />
                </div>
            </div>

            {/* OPTIONAL VIDEO BELOW */}
            <div className="h-16" />

            <div className="mt-12 flex justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full md:max-w-5xl rounded-md shadow-2xl border border-border-subtle"
                >
                    <source src="/videos/dashboard.webm" type="video/webm" />
                    <source src="/videos/dashboard.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="h-8" />
        </div>
    );
}
