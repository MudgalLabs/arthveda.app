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

export const metadata: Metadata = {
    title: "Arthveda — A trading journal built for Indian markets",
    description:
        "Trading analytics platform with seamless broker integrations built exclusively for Indian traders.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
