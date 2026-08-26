import Link from "next/link";
import Image from "next/image";
import { Youtube, Instagram } from "lucide-react";

import BuilderCard from "@/components/builder_card";
import { ChatLink } from "@/components/chat_link";

export default function Footer() {
    return (
        <footer className="border-t border-accent-muted mt-24 sm:mt-32 mb-18">
            <div className="flex-y sm:flex-x items-start justify-between gap-8 mt-8">
                {/* Left column: branding, socials, copyright, builder card, feedback */}
                <div className="flex flex-col items-start gap-6">
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/svgs/branding.svg"
                            alt="Arthveda"
                            width={160}
                            height={23}
                            className="h-auto"
                        />
                    </Link>

                    <p className="text-sm text-text-muted">
                        Copyright © 2026 · All rights reserved
                    </p>

                    <div className="flex-x gap-x-4">
                        <a href="https://www.instagram.com/arthvedahq">
                            <Instagram size={24} />
                        </a>

                        <a href="https://www.youtube.com/@ArthvedaHQ">
                            <Youtube size={24} />
                        </a>
                    </div>

                    <BuilderCard />

                    <p className="text-sm text-text-muted text-balance">
                        <ChatLink className="font-bold text-sm!">
                            Talk to me
                        </ChatLink>{" "}
                        if you want to give feedback, request a feature, report a
                        bug or just say hi.
                        <br />
                        You can also email me at{" "}
                        <a
                            href="mailto:hey@ceoshikhar.com"
                            className="font-bold text-sm!"
                        >
                            hey@ceoshikhar.com
                        </a>
                    </p>
                </div>

                {/* Right: footer navigation */}
                <div className="flex-y sm:flex-x gap-x-4! self-start">
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/refund">Refund Policy</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>

            <p className="text-xs text-text-muted mt-10 max-w-4xl">
                <strong className="text-xs!">Disclaimer:</strong> Arthveda is a
                trade journal and analytics tool. It is not an investment
                adviser and is not registered with SEBI. Nothing on Arthveda is
                investment advice, a buy, sell or hold recommendation, or a
                trade signal. Screeners return whatever matches the filters you
                choose, and the analytics describe trades you have already
                taken. Every trading decision is yours alone, and you are
                solely responsible for it. Market data may be delayed or
                inaccurate, and past performance is not a guarantee of future
                results.
            </p>
        </footer>
    );
}
