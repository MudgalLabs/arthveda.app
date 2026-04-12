import { GetStarted } from "@/components/get_started";

export default function BottomCTA() {
    return (
        <div id="bottom-cta">
            <h3 className="section-header mx-auto text-center max-w-3xl">
                Stop guessing. <br className="sm:hidden" />
                Start improving.
            </h3>

            <div className="h-8" />

            <GetStarted />
        </div>
    );
}
