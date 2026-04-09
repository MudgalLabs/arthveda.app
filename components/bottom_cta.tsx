import { GetStarted } from "@/components/get_started";

export default function BottomCTA() {
    return (
        <div id="bottom-cta" className="mt-24">
            <h3 className="section-header mx-auto text-center max-w-3xl">
                Start your journey towards being a consistently profitable
                trader
            </h3>

            <div className="h-8" />

            <GetStarted />
        </div>
    );
}
