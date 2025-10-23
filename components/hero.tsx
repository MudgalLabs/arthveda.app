import Image from "next/image";
// import OpenDemo from "@/components/open_demo";
import { GetStarted } from "./get_started";

const slideInStyles = `
@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-in-bottom {
  animation: slideInFromBottom 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
}

@keyframes slideOutRight {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(8px);
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-8px);
  }
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.arrow-icon {
  transition: all 0.2s ease-in-out;
}

.arrow-button:hover .arrow-icon {
  animation: slideOutRight 0.15s ease-in-out forwards, slideInLeft 0.15s ease-in-out 0.15s forwards;
}

.arrow-button:not(:hover) .arrow-icon {
  animation: slideOutLeft 0.15s ease-in-out forwards, slideInRight 0.15s ease-in-out 0.15s forwards;
}
`;

export default function Hero() {
    return (
        <main className="mt-12 md:mt-16">
            <h1 className="w-[80%] flex flex-wrap mx-auto justify-center gap-x-2 text-center md:gap-x-3.5 gap-y-1 md:gap-y-2 text-3xl sm:text-5xl md:text-7xl font-medium lg:font-semibold leading-tight">
                The Trading Journal Built for
                <span className="inline! text-accent">Indian Markets</span>
            </h1>

            <div className="h-6" />

            <p className="text-center mx-auto text-sm sm:text-base md:w-[75%] md:text-xl text-foreground">
                Arthveda is an{" "}
                <a
                    className="text-sm! sm:text-base! md:text-xl!"
                    href="https://github.com/MudgalLabs/arthveda"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    open-source
                </a>{" "}
                trading journal that imports your trades, reveals powerful
                analytics, and helps you improve.
            </p>
            <div className="h-8" />

            {/* <OpenDemo /> */}
            <GetStarted />

            <div className="h-16" />

            {/* Inject animation styles */}
            <style>{slideInStyles}</style>
            <a
                href="/images/dashboard.png"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/images/dashboard.png"
                    alt="Arthveda Dashboard"
                    width={1900}
                    height={900}
                    className={`hidden md:block w-full md:w-[100%] mx-auto h-auto outline-offset-1 outline-1 md:outline-1 hover:outline-border-hover outline-border-subtle rounded-none md:rounded-sm transition-all duration-300 ease-in-out animate-slide-in-bottom`}
                    loading="eager"
                />
            </a>
            <a
                href="/images/dashboard.png"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/images/dashboard_zoomed.png"
                    alt="Arthveda Dashboard"
                    width={1900}
                    height={900}
                    className={`md:hidden w-fullmx-auto h-auto outline-1 outline-offset-1 md:outline-2 hover:outline-accent outline-accent-muted rounded-sm transition-all duration-300 ease-in-out animate-slide-in-bottom`}
                    loading="lazy"
                />
            </a>

            <div className="h-2" />

            {/* <div className="text-center">
                <small className="italic text-muted-foreground">
                    Arthveda is not a trading platform and does not facilitate
                    any financial transactions or offer investment advice. It is
                    a trade journaling and analytics tool designed solely to
                    help users log, review, and analyze their own historical
                    trades.
                </small>
            </div> */}
        </main>
    );
}
