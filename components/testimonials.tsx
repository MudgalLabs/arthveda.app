import Image from "next/image";

export default function Testimonials() {
    return (
        <section className="mt-16 md:mt-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h3 className="section-header">What traders are saying</h3>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-center">
                        <Image
                            src="/images/testimonial_3.png"
                            alt="Customer email testimonial"
                            width={900}
                            height={300}
                            className="rounded-xl shadow-lg w-full max-w-3xl hover:rotate-none hover:scale-[1.1] transition"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* LEFT STACK */}
                        <div className="flex flex-col gap-4">
                            <Image
                                src="/images/testimonial_2.png"
                                alt="Insight testimonial"
                                width={600}
                                height={200}
                                className="rounded-xl shadow-lg -rotate-1 hover:rotate-none hover:scale-[1.1] transition"
                            />

                            <Image
                                src="/images/testimonial_1.png"
                                alt="Beginner friendly testimonial"
                                width={600}
                                height={200}
                                className="rounded-xl shadow-lg rotate-1 hover:rotate-none hover:scale-[1.1] transition"
                            />

                            <Image
                                src="/images/testimonial_5.png"
                                alt="Subscription intent testimonial"
                                width={600}
                                height={200}
                                className="rounded-xl shadow-lg -rotate-1 hover:rotate-none hover:scale-[1.1] transition"
                            />
                        </div>

                        {/* RIGHT TALL */}
                        <div className="flex justify-center">
                            <Image
                                src="/images/testimonial_4.png"
                                alt="Detailed feedback testimonial"
                                width={600}
                                height={500}
                                className="rounded-xl rotate-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:scale-[1.1] hover:rotate-none transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
