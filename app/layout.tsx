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

const TITLE = "Arthveda: Trading journal for Indian stock market traders";
const DESCRIPTION =
    "Track trades, analyze performance, and improve profitability with Arthveda — the trading journal built for Indian traders. Seamless import from Zerodha, Upstox, and Groww.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:url" content="https://arthveda.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Arthveda" />
                <meta
                    property="og:image"
                    content="https://arthveda.app/images/og-image.png"
                />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={TITLE} />
                <meta name="twitter:description" content={DESCRIPTION} />
                <meta
                    name="twitter:image"
                    content="https://arthveda.app/images/og-image.png"
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
