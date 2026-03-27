import { GetStarted } from "@/components/get_started";

export default function Hero() {
    return (
        <div>
            <header className="mt-12 md:mt-16">
                <h1 className="page-header">
                    We finally built a trading journal for the Indian markets!
                </h1>

                <div className="h-4" />

                <h2 className="font-moniker font-bold text-center text-text-primary text-2xl sm:text-4xl leading-tight text-balance">
                    Arthveda shows you the story behind profits and losses.
                </h2>

                <div className="h-12" />
            </header>

            <footer>
                <GetStarted />

                <div className="h-4" />
                <p className="text-center italic text-text-muted">
                    No credit card required.
                </p>
            </footer>

            <div className="h-12" />

            {/* <HeroScreenshot /> */}

            <div className="w-full mx-auto bg-surface-2 p-2 md:p-4 rounded-sm sm:rounded-md flex justify-center items-center">
                {/* <span className="absolute -top-2 md:-top-2 -right-1 md:-right-4 z-10">
                    <PriceTag />
                </span> */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto outline-offset-1 outline-1 md:outline-1 hover:outline-border-hover outline-border-soft rounded-sm sm:rounded-md transition-all duration-300 ease-in-out animate-slide-in-bottom"
                >
                    <source src="/videos/dashboard.webm" type="video/webm" />
                    <source src="/videos/dashboard.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="h-8" />

            {/* <a
                href="https://cal.com/ceoshikhar/arthveda-demo"
                target="_blank"
                rel="noreferrer"
                className="text-center block text-base!"
            >
                Book a demo with the founder
            </a> */}
        </div>
    );
}
