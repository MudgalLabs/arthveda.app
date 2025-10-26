import { GetStarted } from "@/components/get_started";
import { HeroScreenshot } from "./hero_screenshot";

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
            </footer>

            <div className="h-12" />

            <HeroScreenshot />

            <div className="h-8" />

            <a
                href="https://cal.com/ceoshikhar/arthveda-demo"
                target="_blank"
                rel="noreferrer"
                className="text-center block text-base!"
            >
                Book a demo with the founder
            </a>
        </div>
    );
}
