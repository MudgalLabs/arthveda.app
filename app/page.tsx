import Hero from "@/components/hero";
import Movtivation from "@/components/motivation";
import Features from "@/components/features";
import Brokers from "@/components/brokers";
import FloatingGetStarted from "@/components/floating_get_started";

export default function Home() {
    return (
        <>
            <Hero />
            <Brokers />
            <Movtivation />
            <Features />
            <FloatingGetStarted />
        </>
    );
}
