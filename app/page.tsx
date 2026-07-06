import Hero from "@/components/hero";
import ProductBlocks from "@/components/product_blocks";
import FounderLetter from "@/components/founder_letter";
import Testimonials from "@/components/testimonials";
import BottomCTA from "@/components/bottom_cta";
import FAQ from "@/components/faq";

export default function Home() {
    return (
        <div className="space-y-20 sm:space-y-24 md:space-y-32">
            <Hero />
            <ProductBlocks />
            <Testimonials />
            <FounderLetter />
            <FAQ />
            <BottomCTA />
        </div>
    );
}
