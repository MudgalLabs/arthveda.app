import { GetStarted } from "@/components/get_started";

export default function BottomCTA() {
    return (
        <div id="bottom-cta" className="mx-auto text-center max-w-3xl">
            <h3 className="section-header ">
                Stop guessing. <br className="sm:hidden" />
                Start improving.
            </h3>

            <div className="h-8" />

            <GetStarted />
        </div>
    );
}
