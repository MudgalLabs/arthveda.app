"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import posthog from "posthog-js";

import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { NAV_FAMILIES } from "@/lib/nav";
import { APP_URL } from "@/lib/links";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false); // desktop hover
    const [activeFamily, setActiveFamily] = useState(NAV_FAMILIES[0].name);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Lock body scroll while the full-screen mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const openProduct = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setProductOpen(true);
    };

    const closeProduct = () => {
        timeoutRef.current = setTimeout(() => {
            setProductOpen(false);
            setActiveFamily(NAV_FAMILIES[0].name); // reopen on Discover
        }, 200);
    };

    const closeMenu = () => setMenuOpen(false);

    const goToAppButton = (
        <a
            href={APP_URL}
            onClick={() => posthog.capture("Clicked Open App")}
            className="unstyled-link"
        >
            <Button>
                <span className="flex-x">
                    Open app
                    <ArrowRight size={16} />
                </span>
            </Button>
        </a>
    );

    return (
        <>
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-white/[0.08]">
            <div className="relative mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 md:px-6 lg:px-8">
                {/* Branding (left) */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/svgs/branding.svg"
                        alt="Arthveda"
                        width={164}
                        height={64}
                        className="hidden h-auto sm:inline-block"
                    />
                    <Image
                        src="/svgs/logo.svg"
                        alt="Arthveda"
                        width={32}
                        height={32}
                        className="inline-block h-auto sm:hidden"
                    />
                </Link>

                {/* Nav links (centered) */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-sm lg:flex">
                    <div
                        onMouseEnter={openProduct}
                        onMouseLeave={closeProduct}
                    >
                        <Button variant="ghost">
                            Product
                            <ChevronDown
                                size={16}
                                className={cn(
                                    "transition-transform duration-200 ease-out",
                                    productOpen && "rotate-180",
                                )}
                            />
                        </Button>
                    </div>

                    <Link href="/brokers" className="unstyled-link">
                        <Button variant="ghost">Brokers</Button>
                    </Link>

                    <Link href="/pricing" className="unstyled-link">
                        <Button variant="ghost">Pricing</Button>
                    </Link>
                </div>

                {/* CTA + mobile toggle (right) */}
                <div className="flex items-center gap-4">
                    {goToAppButton}
                    <button
                        aria-label="Open menu"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-text-muted lg:hidden"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Product mega-menu — centered under the nav. Non-interactive
                    while closed so its (still laid-out) box doesn't catch hovers
                    over the hero; opening is driven by the Product button. */}
                <div
                    onMouseEnter={openProduct}
                    onMouseLeave={closeProduct}
                    className={cn(
                        "absolute left-1/2 top-full hidden -translate-x-1/2 lg:block",
                        !productOpen && "pointer-events-none",
                    )}
                >
                    <ProductMegaMenu
                        isActive={productOpen}
                        activeFamily={activeFamily}
                        onHoverFamily={setActiveFamily}
                    />
                </div>

            </div>
        </nav>

        {/* Mobile menu — full-screen, flat sections (Linear-style). Rendered
            outside <nav> because the navbar's backdrop-blur would trap a fixed
            child. */}
        <div
            className={cn(
                "lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background",
                "transition-opacity duration-200",
                menuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none",
            )}
        >
            <div className="px-6 py-8">
                {NAV_FAMILIES.map((family) => (
                    <div key={family.name} className="mb-9">
                        <Link
                            href={family.href}
                            onClick={closeMenu}
                            className="mb-3 block text-xs font-medium uppercase tracking-wider text-text-subtle no-underline!"
                        >
                            {family.name}
                        </Link>
                        <div className="flex flex-col gap-y-1">
                            {family.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block py-1.5 text-xl text-text-primary no-underline!"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex flex-col gap-y-1 border-t border-border-subtle pt-7">
                    <Link
                        href="/brokers"
                        onClick={closeMenu}
                        className="block py-1.5 text-xl text-text-primary no-underline!"
                    >
                        Brokers
                    </Link>
                    <Link
                        href="/pricing"
                        onClick={closeMenu}
                        className="block py-1.5 text-xl text-text-primary no-underline!"
                    >
                        Pricing
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

// The Product dropdown: a row of family sub-tabs (Discover · Journal · Social)
// and, below it, the feature cards for whichever family is hovered. Each sub-tab
// links to its hub (cursor-pointer), so the hub is discoverable too.
interface ProductMegaMenuProps {
    isActive: boolean;
    activeFamily: string;
    onHoverFamily: (name: string) => void;
}

function ProductMegaMenu({
    isActive,
    activeFamily,
    onHoverFamily,
}: ProductMegaMenuProps) {
    const family =
        NAV_FAMILIES.find((f) => f.name === activeFamily) ?? NAV_FAMILIES[0];

    return (
        <div
            className={cn(
                // Fixed width so the panel never resizes between families —
                // a collapsing width would reflow the sub-tabs under the cursor.
                "mt-2.5 w-[720px]",
                "rounded-lg border border-border-subtle bg-surface-1",
                "shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3",
                "origin-top transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-1 scale-95 pointer-events-none",
            )}
        >
            {/* Family sub-tabs — links to the hubs; hover switches the cards. */}
            <div className="flex items-center gap-1 border-b border-border-subtle pb-3">
                {NAV_FAMILIES.map((f) => (
                    <Link
                        key={f.name}
                        href={f.href}
                        onMouseEnter={() => onHoverFamily(f.name)}
                        className={cn(
                            "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium no-underline! transition-colors",
                            f.name === activeFamily
                                ? "bg-surface-2 text-text-primary"
                                : "text-text-muted hover:text-text-primary",
                        )}
                    >
                        {f.name}
                    </Link>
                ))}
            </div>

            {/* Feature cards — 2 equal columns within the fixed-width panel. */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 pt-3">
                {family.items.map((item) => (
                    <NavFeatureCard key={item.href} {...item} />
                ))}
            </div>
        </div>
    );
}

interface NavFeatureCardProps {
    title: string;
    desc: string;
    href: string;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function NavFeatureCard({ title, desc, href, Icon }: NavFeatureCardProps) {
    return (
        <Link
            href={href}
            className="group block h-fit rounded-lg px-3 py-2.5 no-underline! hover:bg-surface-2"
        >
            <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center rounded-md bg-secondary p-2.5 transition-colors group-hover:bg-primary/80">
                    <Icon
                        size={18}
                        className="text-text-muted transition-colors group-hover:text-text-primary"
                    />
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                        {title}
                    </span>
                    <span className="whitespace-nowrap text-sm text-text-muted">
                        {desc}
                    </span>
                </div>
            </div>
        </Link>
    );
}
