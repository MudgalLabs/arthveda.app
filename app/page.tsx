import Hero from "@/components/hero";
import Features from "@/components/features";
import Brokers from "@/components/brokers";
import FounderLetter from "@/components/founder_letter";
import Testimonials from "@/components/testimonials";
import BottomCTA from "@/components/bottom_cta";

export default function Home() {
    return (
        <>
            <Hero />
            <Testimonials />
            <Brokers />
            <Features />
            <FounderLetter />
            <BottomCTA />
        </>
    );
}
