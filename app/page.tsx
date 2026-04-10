import Hero from "@/components/hero";
// import Features from "@/components/features";
// import Brokers from "@/components/brokers";
import FounderLetter from "@/components/founder_letter";
import Testimonials from "@/components/testimonials";
import BottomCTA from "@/components/bottom_cta";
import Product from "@/components/product";
import ImprovementTimeline from "@/components/improvement_timeline";

export default function Home() {
    return (
        <div className="space-y-16 sm:space-y-20 md:space-y-28">
            <Hero />
            <ImprovementTimeline />
            <Product />
            <Testimonials />
            {/* <Brokers />
            <Features /> */}
            <FounderLetter />
            <BottomCTA />
        </div>
    );
}
