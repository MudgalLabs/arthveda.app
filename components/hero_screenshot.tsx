import { Screenshot } from "@/components/screenshot";
// import { PriceTag } from "@/components/price_tag";

export function HeroScreenshot() {
    return (
        <div className="relative w-fit mx-auto">
            {/* <span className="absolute -top-2 md:-top-2 -right-1 md:-right-4 z-10">
                <PriceTag />
            </span> */}
            <Screenshot src="/images/dashboard.webp" alt="Arthveda Dashboard" />
        </div>
    );
}
