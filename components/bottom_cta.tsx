import { GetStarted } from "@/components/get_started";

export default function BottomCTA() {
    return (
        <div id="bottom-cta" className="mx-auto text-center max-w-3xl">
            <h3 className="section-header">
                Start building your <br className="sm:hidden" />
                trading process.
            </h3>

            <div className="h-8" />

            <div className="mx-auto w-fit">
                <GetStarted noCardNote />
            </div>

            <div className="h-8" />

            {/* The single, vague forward-looking line (plan §8 — no roadmap leak). */}
            <p className="text-text-subtle mx-auto max-w-2xl text-sm leading-relaxed">
                Built for swing traders today. Growing into a broader workspace
                for serious Indian traders.
            </p>
        </div>
    );
}
