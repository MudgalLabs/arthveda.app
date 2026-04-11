import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";

import { PostHogProvider } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import "@/app/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const TITLE = "Trading Journal for Indian Traders | Arthveda";
const DESCRIPTION =
    "Track, analyze, and improve your trading with Arthveda — a trading journal for Indian traders. Import trades from Zerodha, Upstox, and Groww. Start with a 30-day free trial.";

export const metadata: Metadata = {
    metadataBase: new URL("https://arthveda.app"),

    title: TITLE,
    description: DESCRIPTION,

    keywords: [
        "trading journal India",
        "Zerodha journal",
        "stock trading tracker India",
        "trade analysis tool",
    ],

    alternates: {
        canonical: "/",
    },

    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "/",
        siteName: "Arthveda",
        type: "website",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                type: "image/png",
                alt: "Arthveda trading journal dashboard",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/images/og-image.png"],
    },

    icons: {
        icon: "/favicon.png",
    },

    themeColor: "#0f172a",

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            name: "Arthveda",
                            applicationCategory: "FinanceApplication",
                            operatingSystem: "Web",
                            description:
                                "Track, analyze, and improve your trading with Arthveda — a trading journal for Indian traders. Import trades from Zerodha, Upstox, and Groww. Start with a 30-day free trial.",
                            url: "https://arthveda.app",
                            offers: {
                                "@type": "Offer",
                                price: "399",
                                priceCurrency: "INR",
                            },
                        }),
                    }}
                />
            </head>

            <body
                className={`${GeistSans.variable} ${inter.variable} antialiased w-full flex justify-center px-4`}
            >
                <PostHogProvider>
                    <TooltipProvider>
                        <div className="fixed inset-0 -z-10 bg-[#05070f] overflow-hidden">
                            {/* Primary glow */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `
                                        radial-gradient(circle 600px at 70% 20%, rgba(99,102,241,0.25), transparent),
                                        radial-gradient(circle 500px at 30% 60%, rgba(59,130,246,0.15), transparent)
                                    `,
                                }}
                            />

                            {/* Soft atmospheric layer */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.05), transparent 60%)",
                                    filter: "blur(40px)",
                                }}
                            />

                            {/* Subtle vignette */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6))",
                                }}
                            />
                        </div>

                        {/* Content */}
                        <div className="w-full">
                            <Navbar />

                            <div className="w-full mx-auto px-4 md:px-6 lg:px-8 max-w-[1440px] xl:px-16">
                                {children}
                                <Footer />
                            </div>
                        </div>
                    </TooltipProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
