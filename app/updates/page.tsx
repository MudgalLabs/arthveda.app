import type { Metadata } from "next";

import { UpdatesTimeline } from "@/components/updates_timeline";
import { UPDATES, ogFor } from "@/lib/updates";

const SITE = "https://arthveda.app";
const TITLE = "What's new · Arthveda";
const DESCRIPTION =
    "Every Arthveda release since the first beta, plus the milestones of building it, newest first, with how to use each feature.";
// The share card: the newest post that has its own screenshot.
const latestPost = UPDATES.find((u) => u.og);
const latestCard = latestPost ? ogFor(latestPost) : undefined;

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
        images: latestCard
            ? [{ url: latestCard.src, width: latestCard.width, height: latestCard.height, alt: latestCard.alt }]
            : undefined,
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: latestCard ? [latestCard.src] : undefined,
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
        image: `${SITE}${u.cover?.src ?? ogFor(u).src}`,
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
                    What shipped in Arthveda since the first beta, and the milestones of building it, newest first.
                </p>
            </section>

            <UpdatesTimeline updates={UPDATES} />
        </main>
    );
}
