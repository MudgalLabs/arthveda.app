import { PRODUCT, PRODUCT_KEYS } from "@/lib/product_constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
    return (
        <section>
            <div className="mx-auto">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h3 className="section-header">Understand your trading</h3>

                    <p className="text-text-muted mt-3">
                        Analyze your trades. Find what works. Fix what doesn’t.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCT_KEYS.map((key) => {
                        const item = PRODUCT[key];

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="unstyled-link"
                            >
                                <ProductCard
                                    title={item.title}
                                    subtitle={item.desc}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        width={800}
                                        height={600}
                                        className={cn(
                                            "absolute top-0 left-0 origin-top-left transition-transform duration-300 ease-out",
                                            item.imageClassName,
                                        )}
                                    />
                                </ProductCard>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

type ProductCardProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export function ProductCard({ title, subtitle, children }: ProductCardProps) {
    return (
        <div className="rounded-xl bg-surface-1 overflow-hidden group border-border-subtle/50 border shadow-2xl">
            <div className="p-6">
                <h4 className="text-lg font-medium text-text-primary leading-tight">
                    {title}
                </h4>

                <div className="h-2" />

                <p className="text-sm text-text-muted">{subtitle}</p>

                <div className="h-4" />

                <div className="flex items-center gap-1">
                    <p className="font-medium text-sm text-link">Learn more</p>

                    <span className="text-link transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-2">
                        →
                    </span>
                </div>
            </div>

            <div className="relative w-full h-[360px] overflow-hidden">
                {children}

                {/* Fade out at the bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-surface-1/50 via-transparent to-transparent" />
            </div>
        </div>
    );
}
