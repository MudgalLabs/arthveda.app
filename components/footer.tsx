import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-accent-muted mt-24 sm:mt-32">
            <div className="flex-x items-start justify-between mt-2">
                <div>
                    <p className="text-sm">© 2025 Mudgal Labs</p>
                </div>

                <div className="flex-y sm:flex-x gap-x-4!">
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/refund">Refund Policy</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
            </div>

            <div className="py-4 flex-center">
                <div className="space-y-2 text-center">
                    <p className="text-sm sm:text-base inline-block text-foreground">
                        Built with 💙️️ by{" "}
                        <a
                            href="https://mudgallabs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm! sm:text-base! inline-flex items-center"
                        >
                            Mudgal Labs <ArrowUpRight size={18} />
                        </a>
                    </p>

                    <p className="text-sm sm:text-base">
                        Give feedback, request a feature, report a bug or{" "}
                        <br className="block sm:hidden" />
                        just say hi on{" "}
                        <a
                            href="mailto:hey@arthveda.app"
                            className="font-bold text-sm! sm:text-base!"
                        >
                            hey@arthveda.app
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
