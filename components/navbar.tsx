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
        }, 200);
    };

    // Close the dropdown immediately (e.g. after clicking a family card), so it
    // doesn't linger open over the page we just navigated to.
    const closeProductNow = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setProductOpen(false);
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
                        onNavigate={closeProductNow}
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
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-subtle">
                    Product
                </p>
                <div className="mb-9 flex flex-col gap-y-1">
                    {NAV_FAMILIES.map((family) => (
                        <Link
                            key={family.name}
                            href={family.href}
                            onClick={closeMenu}
                            className="flex items-start gap-3.5 rounded-lg py-2.5 no-underline!"
                        >
                            <div className="mt-0.5 flex items-center justify-center rounded-md bg-secondary p-2.5">
                                <family.Icon
                                    size={18}
                                    className="text-text-muted"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl text-text-primary">
                                    {family.name}
                                </span>
                                <span className="text-sm text-text-muted">
                                    {family.subtitle}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

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

// The Product dropdown: just the 3 family cards (Discover · Journal · Social),
// each a one-line subtitle linking to its hub. No per-feature links and no
// `#anchor` deep-links — see plan §4. It mirrors the homepage's 3 stacked family
// blocks and scales: Options/Algo become a 4th/5th card only when they ship.
function ProductMegaMenu({
    isActive,
    onNavigate,
}: {
    isActive: boolean;
    onNavigate: () => void;
}) {
    return (
        <div
            className={cn(
                "mt-2.5 w-[380px]",
                "rounded-lg border border-border-subtle bg-surface-1",
                "shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-2",
                "origin-top transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-1 scale-95 pointer-events-none",
            )}
        >
            <div className="flex flex-col">
                {NAV_FAMILIES.map((family) => (
                    <Link
                        key={family.name}
                        href={family.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-3.5 rounded-lg px-3 py-3 no-underline! hover:bg-surface-2"
                    >
                        <div className="mt-0.5 flex items-center justify-center rounded-md bg-secondary p-2.5 transition-colors group-hover:bg-primary/80">
                            <family.Icon
                                size={18}
                                className="text-text-muted transition-colors group-hover:text-text-primary"
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-text-primary">
                                {family.name}
                            </span>
                            <span className="text-sm text-text-muted">
                                {family.subtitle}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
