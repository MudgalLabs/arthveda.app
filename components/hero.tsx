// import OpenDemo from "@/components/open_demo";
import { GetStarted } from "@/components/get_started";
import { Screenshot } from "@/components/screenshot";

export default function Hero() {
    return (
        <div>
            <header className="mt-12 md:mt-16">
                <h1 className="page-header">
                    We finally built a trading journal for the Indian markets!
                </h1>

                <div className="h-4" />

                <h2 className="font-moniker font-bold text-center text-text-primary text-2xl sm:text-4xl leading-tight text-balance">
                    {/* Arthveda is India-first with seamless broker integrations and
                fair pricing. */}
                    Arthveda shows you the metrics that matter and the
                    behaviours that lead to profit with the power of journaling
                    and analytics.
                </h2>

                <div className="h-12" />
            </header>

            <footer>
                {/* <OpenDemo /> */}
                <GetStarted />

                <div className="h-4" />

                <a
                    href="https://cal.com/ceoshikhar/arthveda-demo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-center block text-sm font-moniker"
                >
                    Book a demo with the founder
                </a>

                {/* <p className=" text-xs sm:text-base text-text-muted italic font-moniker text-center">
                    No credit card required.
                </p> */}
            </footer>

            <div className="h-15" />

            <Screenshot src="/images/dashboard.webp" alt="Arthveda Dashboard" />
        </div>
    );
}
