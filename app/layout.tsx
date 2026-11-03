import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Caveat, Inter } from "next/font/google";

import { PostHogProvider } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GrahakWidget from "@/components/grahak_widget";

import { fetchPricing } from "@/lib/pricing";

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
const TITLE = "Trading OS · Arthveda";
const DESCRIPTION =
    "Built for traders: discover stocks, build intelligent watchlists, track their journey with every stock, journal trades, and share their process.";

// Next 15 wants themeColor in a viewport export, not metadata.
export const viewport: Viewport = {
    themeColor: "#0f172a",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://arthveda.app"),

    title: TITLE,
    description: DESCRIPTION,

    // India-first search terms stay alongside the global ones: the tagline
    // went global (2026-10-30), but India is still where the depth is.
    keywords: [
        "trading OS",
        "trading journal",
        "stock screener",
        "US stock screener",
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
                alt: "Trading OS · Arthveda",
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

// Re-render static pages every 10 minutes so the structured-data offers below
// pick up a price changed in Paddle (and fill in after a build that couldn't
// reach the API).
export const revalidate = 600;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Structured-data offers carry the live yearly price for the base (USD)
    // and India (INR). Fetched with a revalidate window so every page stays
    // static.
    const [usd, inr] = await Promise.all([
        fetchPricing("US", { revalidate: 600 }),
        fetchPricing("IN", { revalidate: 600 }),
    ]);
    const offers = [
        ...(usd ? [{ "@type": "Offer", price: String(usd.yearlyPrice), priceCurrency: usd.currency }] : []),
        ...(inr
            ? [
                  {
                      "@type": "Offer",
                      price: String(inr.yearlyPrice),
                      priceCurrency: inr.currency,
                      eligibleRegion: { "@type": "Country", name: "IN" },
                  },
              ]
            : []),
    ];

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
                            // Yearly price, live from Paddle: USD is the
                            // base price, INR the India override.
                            ...(offers.length > 0 && { offers }),
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
