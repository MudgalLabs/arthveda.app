import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BuilderCardProps {
    className?: string;
}

// The signature of the product. A quiet profile card, not a CTA: tap anywhere
// to land on ceoshikhar.com, where everything else I build lives. Reused
// verbatim across the site (footer, About) so it becomes recognizable.
export default function BuilderCard({ className }: BuilderCardProps) {
    return (
        <a
            href="https://ceoshikhar.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by ceoshikhar.com"
            className={cn(
                "group flex w-full max-w-md items-start gap-4 rounded-lg border border-white/10 bg-surface-1/40 px-4 py-3 text-left no-underline!",
                "cursor-pointer transition-all duration-200 ease-out",
                "hover:-translate-y-px hover:border-link",
                className,
            )}
        >
            <Image
                src="https://ceoshikhar.com/images/me.jpg"
                alt="Shikhar Sharma"
                width={48}
                height={48}
                className="shrink-0 rounded-full"
                sizes="48px"
                loading="lazy"
            />

            <div className="flex flex-col leading-tight">
                <span className="text-xs text-text-muted">Built by</span>
                <span className="text-sm font-bold text-link">
                    ceoshikhar.com
                </span>
                <span className="text-xs text-text-muted">
                    I build things. Sometimes they&apos;re good.
                </span>
            </div>

            <ArrowUpRight
                size={18}
                className="ml-auto shrink-0 text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
        </a>
    );
}
