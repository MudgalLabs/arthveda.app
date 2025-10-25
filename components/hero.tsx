import Image from "next/image";
// import OpenDemo from "@/components/open_demo";
import { GetStarted } from "./get_started";

export default function Hero() {
    return (
        <main className="mt-12 md:mt-16">
            <h1 className="font-reallysans brand-gradient mx-auto text-center text-[44px] sm:text-5xl md:text-7xl font-semibold leading-tight">
                We finally built a trading journal for the Indian markets!
            </h1>

            <div className="h-4" />

            <h2 className="font-moniker font-bold text-center text-foreground text-2xl sm:text-4xl leading-tight">
                {/* Arthveda is India-first with seamless broker integrations and
                fair pricing. */}
                Arthveda shows you the metrics that matter and the behaviours
                that lead to profit with the power of journaling and analytics.
            </h2>

            <div className="h-12" />

            {/* <OpenDemo /> */}
            <GetStarted />

            <div className="h-4" />

            <p className=" text-xs sm:text-base text-text-muted italic font-moniker text-center">
                No credit card required.
            </p>

            <div className="h-15" />

            {/* Inject animation styles */}
            {/* <style>{slideInStyles}</style> */}
            <div className="w-full md:w-[100%] mx-auto bg-surface-2 p-2 md:p-4 rounded-sm sm:rounded-md flex justify-center items-center transition-all duration-300 ease-in-out">
                <Image
                    src="/images/dashboard.webp"
                    alt="Arthveda Dashboard"
                    width={1900}
                    height={900}
                    className={`w-full h-auto outline-offset-1 outline-1 md:outline-1 hover:outline-border-hover outline-border-soft rounded-sm sm:rounded-md transition-all duration-300 ease-in-out animate-slide-in-bottom`}
                    loading="eager"
                />
            </div>
        </main>
    );
}
