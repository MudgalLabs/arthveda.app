import type { Metadata } from "next";
import localFont from "next/font/local";

import { PostHogProvider } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingGetStarted from "@/components/floating_get_started";

import "@/app/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const reallySans = localFont({
    src: [
        {
            path: "../public/fonts/ReallySansLarge-Extra-Black.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../public/fonts/ReallySansLarge-Extra-BlackItalic.woff2",
            weight: "800",
            style: "italic",
        },
        {
            path: "../public/fonts/ReallySansLarge-Ultra.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-reallysans",
    display: "swap",
});

const moniker = localFont({
    src: [
        {
            path: "../public/fonts/MonikerWebRegular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/MonikerWebRegularItalic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/MonikerWebMedium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/MonikerWebMediumItalic.woff2",
            weight: "500",
            style: "italic",
        },
        {
            path: "../public/fonts/MonikerWebBold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-moniker",
    display: "swap",
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
        icon: "/favicon.ico",
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
                className={`${reallySans.variable} ${moniker.variable} antialiased w-full flex justify-center px-4`}
            >
                <PostHogProvider>
                    <TooltipProvider>
                        <div className="w-full max-w-[1200px]">
                            <Navbar />
                            <div className="w-full max-w-[1200px]">
                                {children}
                            </div>
                            <FloatingGetStarted />
                            <Footer />
                        </div>
                    </TooltipProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
