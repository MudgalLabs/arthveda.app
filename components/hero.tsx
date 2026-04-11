import Image from "next/image";

import { GetStarted } from "@/components/get_started";
import { BrokerStrip } from "@/components/brokers";
import { Tag } from "@/ui/tag";

export default function Hero() {
    return (
        <section className="mt-8 md:mt-12">
            <div className="mx-auto w-fit">
                <Tag variant="primary">
                    <p className="font-content text-text-muted text-xs sm:text-sm">
                        Brokers show trades. Arthveda shows what to fix.
                    </p>
                </Tag>
            </div>

            <div className="h-8 md:h-12" />

            <div className="md:px-4 xl:px-0 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* LEFT */}
                <div className="text-center lg:text-left">
                    <h1 className="font-heading text-text-primary text-[36px] sm:text-[52px] md:text-[60px] font-semibold leading-[1.05] tracking-[-0.02em]">
                        You’re not learning <br />
                        from your trades.
                    </h1>

                    <div className="h-4" />

                    <h2 className="font-content text-text-primary text-base sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Arthveda turns your trades into clear insights —
                        <br className="hidden sm:inline-block" /> so you know
                        why you’re losing money or making it.
                    </h2>

                    <div className="h-4" />

                    <p className="text-text-muted text-sm">
                        Built for Indian traders.
                        <br />
                        Works with Zerodha, Groww, Angel One and more.
                    </p>

                    <div className="h-12" />

                    <div
                        id="hero-cta"
                        className="flex flex-col sm:flex-x! items-center justify-center lg:justify-start gap-4 sm:gap-8!"
                    >
                        <GetStarted />

                        <p className="text-text-muted text-sm">
                            No credit card required.
                        </p>
                    </div>

                    <div className="h-12" />

                    <span className="flex-x gap-x-1 text-text-muted text-sm justify-center">
                        <p className="flex-x gap-x-1!">
                            <span className="hidden sm:inline-block">
                                Trusted by
                            </span>
                            500+ Indian traders · 75,000+ trades analyzed
                        </p>
                    </span>
                </div>

                <div
                    className="relative w-full hidden lg:flex items-center"
                    style={{
                        background:
                            "radial-gradient(circle at 75% 45%, rgba(99,102,241,0.12), transparent 60%)",
                    }}
                >
                    <div className="absolute -top-2 right-4 text-xs text-text-primary mb-2 flex-x">
                        This is what you’re missing
                        <div className="w-2 h-2 bg-text-primary rounded-full animate-ping" />
                    </div>

                    <div className="relative w-full h-[520px] translate-y-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.2s_forwards]">
                        {/* PNL CURVE */}
                        <Image
                            src="/images/pnl-curve.png"
                            alt="PnL curve"
                            width={1200}
                            height={800}
                            className="absolute top-[0%] right-[2%] w-[80%] h-auto rounded-sm z-2"
                            priority
                        />

                        {/* NOTES (LEFT OVERLAY — mid height of PnL) */}
                        <Image
                            src="/images/product_journal.png"
                            alt="Trade notes"
                            width={800}
                            height={600}
                            className="absolute top-[42%] left-[2%] w-[320px] h-auto rounded-sm z-1
                            mask-[linear-gradient(to_bottom,black_60%,transparent)]
                            [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
                        />

                        {/* BOTTOM RIGHT STACK */}
                        <div className="absolute bottom-[12%] right-[0%] flex flex-col gap-2 items-end ">
                            <Image
                                src="/images/insight-losing-window.png"
                                alt="Losing window insight"
                                width={600}
                                height={400}
                                className="w-[360px] h-auto rounded-sm z-10 shadow-[0_0_40px_rgba(99,102,241,0.25)] ring-2 ring-accent/50 animate-[float_6s_ease-in-out_infinite]"
                            />

                            <Image
                                src="/images/insight-overtrade.png"
                                alt="Overtrading insight"
                                width={600}
                                height={400}
                                className="w-[300px] h-auto rounded-sm z-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 md:mt-2 w-full">
                <div className="flex-y sm:flex-x! items-start sm:items-center h-full gap-y-2">
                    <span className="text-sm text-text-muted sm:px-3 sm:py-1 w-32 leading-none sm:leading-normal">
                        Works with:
                    </span>
                    <BrokerStrip />
                </div>
            </div>

            {/* OPTIONAL VIDEO BELOW */}

            {/* <div className="h-16" />

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

            <div className="h-8" /> */}
        </section>
    );
}
