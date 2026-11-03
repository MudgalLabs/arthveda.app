import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/ui/tag";
import { UPDATE_BODIES } from "@/content/updates";
import { UPDATES, formatUpdateDate, getUpdate } from "@/lib/updates";

type Params = { slug: string };

const SITE = "https://arthveda.app";

// Same lighting as the homepage product shots (product_blocks.tsx): no frame,
// a top-down spotlight, and a mask that dissolves the screenshot into the page
// (light on the top and sides, longer at the bottom).
const SPOTLIGHT = "radial-gradient(60% 55% at 50% 0%, rgba(150,163,255,0.14), transparent 70%)";
const FADE =
    "linear-gradient(to bottom, transparent 0%, #000 2%, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 1.5%, #000 98.5%, transparent 100%)";

export function generateStaticParams(): Params[] {
    return UPDATES.map((u) => ({ slug: u.slug }));
}

// Unknown slugs 404 instead of rendering on demand: the list is code.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const u = getUpdate(slug);
    if (!u) return {};

    const title = `${u.title} · Arthveda`;
    const url = `/updates/${u.slug}`;
    const published = `${u.date}T00:00:00Z`;
    const images = [{ url: u.og.src, width: u.og.width, height: u.og.height, alt: u.cover.alt, type: "image/jpeg" }];
    return {
        title,
        description: u.summary,
        keywords: u.keywords,
        authors: [{ name: "Shikhar Sharma", url: "https://ceoshikhar.com" }],
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            siteName: "Arthveda",
            title,
            description: u.summary,
            publishedTime: published,
            modifiedTime: published,
            authors: ["Shikhar Sharma"],
            tags: u.tags,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: u.summary,
            images: [{ url: u.og.src, alt: u.cover.alt }],
        },
    };
}

export default async function UpdatePage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const u = getUpdate(slug);
    const Body = UPDATE_BODIES[slug];
    if (!u || !Body) notFound();

    // Structured data: the post as a BlogPosting (date, author, image) plus the
    // breadcrumb trail, so search shows it as a dated article under Arthveda.
    const pageURL = `${SITE}/updates/${u.slug}`;
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: u.title,
            description: u.summary,
            datePublished: u.date,
            dateModified: u.date,
            image: [`${SITE}${u.cover.src}`, `${SITE}${u.og.src}`],
            url: pageURL,
            mainEntityOfPage: pageURL,
            keywords: u.tags.join(", "),
            author: { "@type": "Person", name: "Shikhar Sharma", url: "https://ceoshikhar.com" },
            publisher: {
                "@type": "Organization",
                name: "Arthveda",
                url: SITE,
                logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Arthveda", item: SITE },
                { "@type": "ListItem", position: 2, name: "What's new", item: `${SITE}/updates` },
                { "@type": "ListItem", position: 3, name: u.title, item: pageURL },
            ],
        },
    ];

    return (
        <main className="pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="mx-auto max-w-5xl pt-10 md:pt-14">
                <Link href="/updates" className="font-content text-[13px]">
                    ← What&apos;s new
                </Link>

                {/* The feature itself comes first: a real screenshot says what
                    shipped faster than any paragraph. */}
                <div className="relative mt-6 w-full">
                    <div
                        style={{
                            maskImage: FADE,
                            WebkitMaskImage: FADE,
                            maskComposite: "intersect",
                            WebkitMaskComposite: "source-in",
                        }}
                    >
                        <Image
                            src={u.cover.src}
                            alt={u.cover.alt}
                            width={u.cover.width}
                            height={u.cover.height}
                            quality={90}
                            priority
                            sizes="(min-width: 1024px) 1024px, 100vw"
                            className="w-full"
                        />
                    </div>
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{ background: SPOTLIGHT }}
                    />
                </div>
            </div>

            <article className="mx-auto max-w-3xl">
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <time dateTime={u.date} className="mr-1 font-content text-[13px] text-text-subtle">
                        {formatUpdateDate(u.date)}
                    </time>
                    {u.tags.map((t) => (
                        <Tag key={t} variant="muted" size="small">
                            {t}
                        </Tag>
                    ))}
                </div>
                <h1 className="mt-3 text-balance font-heading text-[34px] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary sm:text-[44px]">
                    {u.title}
                </h1>
                <p className="mt-4 font-content text-[16px] leading-[1.6] text-text-muted">{u.summary}</p>

                <div className="mt-8">
                    <Body />
                </div>
            </article>
        </main>
    );
}
