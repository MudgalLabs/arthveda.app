import { GetStarted } from "@/components/get_started";

export default function Hero() {
    return (
        <div>
            <header className="mt-16 md:mt-24 text-center">
                <h1
                    className="
    font-heading
    text-text-primary
    text-[36px] sm:text-[52px] md:text-[64px]
    font-semibold
    leading-[1.05]
    tracking-[-0.02em]
    max-w-4xl mx-auto
  "
                >
                    You don’t know what’s actually driving your trading results.
                </h1>

                <div className="h-6" />

                <h2
                    className="
    font-content
    text-text-primary
    text-lg sm:text-xl
    leading-relaxed
    max-w-2xl mx-auto
  "
                >
                    Arthveda shows you what’s working, what’s hurting, and how
                    to fix it — based on your own trades.
                </h2>

                <div className="h-4" />

                <p
                    className="
    font-content
    text-text-muted
    text-sm sm:text-base
    max-w-xl mx-auto
  "
                >
                    The patterns, habits, and blind spots your spreadsheets
                    never reveal.
                </p>

                <div className="h-14" />
            </header>

            <footer className="text-center">
                <GetStarted />

                <div className="h-3" />

                <p className="text-text-muted text-sm">
                    No credit card required.
                </p>
            </footer>

            <div className="h-16" />

            <div className="relative flex justify-center items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-md shadow-2xl border border-border-subtle"
                >
                    <source src="/videos/dashboard.webm" type="video/webm" />
                    <source src="/videos/dashboard.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="h-8" />
        </div>
    );
}
