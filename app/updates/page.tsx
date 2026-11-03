import type { Metadata } from "next";
import Link from "next/link";

import { Tag } from "@/ui/tag";
import { UPDATES, formatUpdateDate } from "@/lib/updates";

const SITE = "https://arthveda.app";
const TITLE = "What's new · Arthveda";
const DESCRIPTION = "New features and improvements in Arthveda, newest first, with how to use each one.";
const latest = UPDATES[0];

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/updates" },
    // The newest post's screenshot previews the page when it is shared.
    openGraph: {
        type: "website",
        url: "/updates",
        siteName: "Arthveda",
        title: TITLE,
        description: DESCRIPTION,
        images: latest
            ? [{ url: latest.og.src, width: latest.og.width, height: latest.og.height, alt: latest.cover.alt }]
            : undefined,
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: latest ? [latest.og.src] : undefined,
    },
};

// The timeline as a Blog with its posts, for search.
const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "What's new at Arthveda",
    description: DESCRIPTION,
    url: `${SITE}/updates`,
    publisher: { "@type": "Organization", name: "Arthveda", url: SITE },
    blogPost: UPDATES.map((u) => ({
        "@type": "BlogPosting",
        headline: u.title,
        description: u.summary,
        datePublished: u.date,
        url: `${SITE}/updates/${u.slug}`,
        image: `${SITE}${u.cover.src}`,
    })),
};

// The release timeline. Every in-app "Product updates" notification links to
// one of these posts, and this page is where a reader goes to see the rest.
// Kept to text: each post opens with its screenshot, so the list stays a
// quick scan.
export default function UpdatesPage() {
    return (
        <main className="pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
            <section className="pt-12 md:pt-16 lg:pt-20">
                <h1 className="max-w-3xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px]">
                    What&apos;s new
                </h1>
                <p className="mt-5 max-w-2xl font-content text-[15px] leading-[1.6] text-text-muted">
                    What shipped in Arthveda, newest first, and how to use it.
                </p>
            </section>

            <ol className="mt-14 max-w-3xl border-l border-white/[0.10]">
                {UPDATES.map((u) => (
                    <li key={u.slug} className="relative pb-12 pl-8 last:pb-0">
                        <span aria-hidden className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                        <time dateTime={u.date} className="font-content text-[13px] text-text-subtle">
                            {formatUpdateDate(u.date)}
                        </time>

                        <h2 className="mt-1.5 font-heading text-[22px] font-medium leading-snug tracking-[-0.01em] text-text-primary">
                            <Link href={`/updates/${u.slug}`} className="unstyled-link hover:underline">
                                {u.title}
                            </Link>
                        </h2>
                        <p className="mt-2 font-content text-[15px] leading-[1.6] text-text-muted">{u.summary}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {u.tags.map((t) => (
                                <Tag key={t} variant="muted" size="small">
                                    {t}
                                </Tag>
                            ))}
                            <Link href={`/updates/${u.slug}`} className="ml-1 font-content text-[13px]">
                                Read more
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </main>
    );
}
