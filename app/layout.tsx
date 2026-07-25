import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Caveat, Inter } from "next/font/google";

import { PostHogProvider } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GrahakWidget from "@/components/grahak_widget";

import "@/app/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const caveat = Caveat({
    variable: "--font-hand",
    subsets: ["latin"],
});

// v2 metadata (plan §1). Center dot `·`, never a pipe. No "free" callout.
const TITLE = "Trading OS for India · Arthveda";
const DESCRIPTION =
    "Built for Indian traders: discover stocks, build intelligent watchlists, track their journey with every stock, journal trades, and share their process.";

// Next 15 wants themeColor in a viewport export, not metadata.
export const viewport: Viewport = {
    themeColor: "#0f172a",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://arthveda.app"),

    title: TITLE,
    description: DESCRIPTION,

    keywords: [
        "trading OS India",
        "stock screener India",
        "swing trading India",
        "trading journal India",
        "trading watchlist",
        "trader profile",
        "market breadth India",
        "sector rotation RRG",
        "Nifty heatmap",
        "connect AI to trading journal",
        "Claude trading journal",
        "MCP trading",
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
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Trading OS for India · Arthveda",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/images/og-image.jpg"],
    },

    icons: {
        icon: "/favicon.png",
    },

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
                            description: DESCRIPTION,
                            url: "https://arthveda.app",
                            offers: {
                                "@type": "Offer",
                                price: "2499",
                                priceCurrency: "INR",
                            },
                        }),
                    }}
                />
            </head>

            <body
                className={`${GeistSans.variable} ${inter.variable} ${caveat.variable} antialiased w-full flex justify-center`}
            >
                <PostHogProvider>
                    <TooltipProvider>
                        {/* Solid background everywhere. The atmospheric glow/
                            lighting lives only in the hero + video container. */}
                        <div className="fixed inset-0 -z-10 bg-[#05070f]" />

                        {/* Grahak customer-conversation widget (overlay/
                            anonymous). Wraps the app so any "Contact"/"Talk to
                            me" link can open it via <ChatLink>; the launcher
                            itself renders through Grahak's own fixed portal. */}
                        <GrahakWidget>
                            {/* Content. overflow-x-clip here (not on the inner
                                column) lets full-bleed children (the hero stage)
                                escape the max-width column while still preventing
                                any horizontal scroll. clip doesn't create a
                                scroll container, so the sticky navbar is
                                unaffected. */}
                            <div className="w-full overflow-x-clip">
                                <div className="sticky top-0 z-50">
                                    <Navbar />
                                </div>

                                <div className="w-full mx-auto px-4 md:px-6 lg:px-8 max-w-[1440px] xl:px-16">
                                    {children}
                                    <Footer />
                                </div>
                            </div>
                        </GrahakWidget>
                    </TooltipProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
