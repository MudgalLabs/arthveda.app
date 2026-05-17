"use client";

import { ReactNode, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Clock as YourIcon } from "lucide-react";
import posthog from "posthog-js";

import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS, PRODUCT_KEYS } from "@/lib/product_constants";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState<{
        product: boolean;
        solutions: boolean;
    }>({
        product: false,
        solutions: false,
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleEnter = (dropdown: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setActiveDropdown(dropdown);
    };

    const handleLeave = (e: React.MouseEvent) => {
        const toElement = e.relatedTarget as Node | null;

        // If moving inside navbar (to another dropdown), ignore
        if (toElement && e.currentTarget.contains(toElement)) {
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

    const goToAppButton = useMemo(() => {
        return (
            <>
                {/* <a
                    href="https://arthveda.app/app/"
                    onClick={() => posthog.capture("Clicked Sign In")}
                    className="unstyled-link"
                >
                    <Button variant="ghost">Sign in</Button>
                </a> */}

                <a
                    href="https://arthveda.app/app/"
                    onClick={() => posthog.capture("Clicked Sign Up")}
                    className="unstyled-link"
                >
                    <Button>Go to app</Button>
                </a>
            </>
        );
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border">
            <div className="mx-auto max-w-[1360px] px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
                <ul className="w-full flex justify-between items-center px-2 md:px-0">
                    {/* Branding */}
                    <div>
                        <li className="w-fit">
                            <Link href="/">
                                <Image
                                    src="/svgs/branding.svg"
                                    alt="Arthveda Logo Branding"
                                    width={164}
                                    height={64}
                                    className="h-auto hidden sm:inline-block"
                                />

                                <Image
                                    src="/svgs/logo.svg"
                                    alt="Arthveda Logo Branding"
                                    width={32}
                                    height={32}
                                    className="h-auto inline-block sm:hidden"
                                />
                            </Link>
                        </li>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-4 text-sm relative">
                        {/* PRODUCT */}
                        <div
                            onMouseEnter={() => handleEnter("product")}
                            onMouseLeave={handleLeave}
                            className="relative"
                        >
                            <DesktopDropdownButton
                                isActive={activeDropdown === "product"}
                            >
                                Product
                            </DesktopDropdownButton>

                            <DesktopDropdownContent
                                isActive={activeDropdown === "product"}
                                className="max-w-[760px] w-[760px]"
                            >
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    {PRODUCT_KEYS.map((key) => {
                                        const item = PRODUCTS[key];

                                        return (
                                            <NavDesktopDropdownLink
                                                key={item.href}
                                                href={item.href}
                                                icon={
                                                    item.Icon ? (
                                                        <item.Icon />
                                                    ) : (
                                                        <YourIcon />
                                                    )
                                                } // can improve later
                                                title={item.title}
                                                description={item.desc}
                                            />
                                        );
                                    })}
                                </div>
                            </DesktopDropdownContent>
                        </div>

                        {/* SOLUTIONS */}
                        {/* <div
                            onMouseEnter={() => handleEnter("solutions")}
                            onMouseLeave={handleLeave}
                            className="relative"
                        >
                            <DesktopDropdownButton
                                isActive={activeDropdown === "solutions"}
                            >
                                Solutions
                            </DesktopDropdownButton>

                            <DesktopDropdownContent
                                isActive={activeDropdown === "solutions"}
                            >
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    <NavDesktopDropdownLink
                                        href="/solutions/intraday"
                                        icon={<YourIcon />}
                                        title="Intraday traders"
                                        description="Improve execution & discipline"
                                    />

                                    <NavDesktopDropdownLink
                                        href="/solutions/swing"
                                        icon={<YourIcon />}
                                        title="Swing traders"
                                        description="Track setups over time"
                                    />

                                    <NavDesktopDropdownLink
                                        href="/solutions/beginners"
                                        icon={<YourIcon />}
                                        title="Beginners"
                                        description="Learn from every trade"
                                    />

                                    <NavDesktopDropdownLink
                                        href="/solutions/overtrading"
                                        icon={<YourIcon />}
                                        title="Overtrading"
                                        description="Fix bad habits early"
                                    />
                                </div>
                            </DesktopDropdownContent>
                        </div> */}

                        <Link href="/brokers">
                            <Button variant="ghost">Brokers</Button>
                        </Link>

                        <Link href="/pricing">
                            <Button variant="ghost">Pricing</Button>
                        </Link>
                    </div>

                    <div className="hidden lg:flex-x">{goToAppButton}</div>

                    <div className="lg:hidden flex items-center gap-4">
                        {goToAppButton}

                        <button
                            aria-label="Open menu"
                            onClick={() => setMenuOpen((v) => !v)}
                            className="text-foreground-muted"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </ul>

                {/* Mobile Dropdown */}
                <div
                    className={`lg:hidden absolute top-14 left-0 w-full px-4 bg-surface-bg border border-surface-border shadow-lg z-50 transition-all duration-300 ease-out rounded-md will-change-transform ${
                        menuOpen
                            ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                            : "opacity-0 pointer-events-none -translate-y-2 scale-[0.98]"
                    }`}
                >
                    {/* <ul className="flex flex-col gap-y-2 py-4">
                        <li>
                            <Link
                                href="/pricing"
                                onClick={() => setMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/roadmap"
                                onClick={() => setMenuOpen(false)}
                            >
                                Roadmap
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://discord.com/invite/QtFxX6g3Ev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Discord
                            </a>
                        </li>
                    </ul> */}

                    <ul className="flex flex-col gap-y-1 py-4">
                        {/* PRODUCT */}
                        <li>
                            <button
                                onClick={() =>
                                    setMobileOpen((prev) => ({
                                        ...prev,
                                        product: !prev.product,
                                    }))
                                }
                                className="w-full flex items-center justify-between py-2 text-left"
                            >
                                <span>Product</span>
                                <ChevronDown
                                    size={18}
                                    className={cn("transition-transform", {
                                        "rotate-180": mobileOpen.product,
                                    })}
                                />
                            </button>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-200",
                                    mobileOpen.product
                                        ? "max-h-96 mt-1"
                                        : "max-h-0",
                                )}
                            >
                                <div className="flex flex-col pl-4">
                                    {PRODUCT_KEYS.map((key) => {
                                        const item = PRODUCTS[key];

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                                className="py-2 text-sm text-text-muted"
                                            >
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </li>

                        {/* SOLUTIONS */}
                        {/* <li>
                            <button
                                onClick={() =>
                                    setMobileOpen((prev) => ({
                                        ...prev,
                                        solutions: !prev.solutions,
                                    }))
                                }
                                className="w-full flex items-center justify-between py-2 text-left"
                            >
                                <span>Solutions</span>
                                <ChevronDown
                                    size={18}
                                    className={cn("transition-transform", {
                                        "rotate-180": mobileOpen.solutions,
                                    })}
                                />
                            </button>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-200",
                                    mobileOpen.solutions
                                        ? "max-h-96 mt-1"
                                        : "max-h-0",
                                )}
                            >
                                <div className="flex flex-col pl-4">
                                    <Link
                                        href="/solutions/intraday"
                                        onClick={() => setMenuOpen(false)}
                                        className="py-2 text-sm text-text-muted"
                                    >
                                        Intraday traders
                                    </Link>
                                    <Link
                                        href="/solutions/swing"
                                        onClick={() => setMenuOpen(false)}
                                        className="py-2 text-sm text-text-muted"
                                    >
                                        Swing traders
                                    </Link>
                                    <Link
                                        href="/solutions/beginners"
                                        onClick={() => setMenuOpen(false)}
                                        className="py-2 text-sm text-text-muted"
                                    >
                                        Beginners
                                    </Link>
                                    <Link
                                        href="/solutions/overtrading"
                                        onClick={() => setMenuOpen(false)}
                                        className="py-2 text-sm text-text-muted"
                                    >
                                        Overtrading
                                    </Link>
                                </div>
                            </div>
                        </li> */}

                        {/* DIRECT LINKS */}
                        <li>
                            <Link
                                href="/brokers"
                                onClick={() => setMenuOpen(false)}
                            >
                                Brokers
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/pricing"
                                onClick={() => setMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

interface DesktopDropdownButtonProps {
    isActive: boolean;
    children: ReactNode;
}

function DesktopDropdownButton(props: DesktopDropdownButtonProps) {
    const { isActive, children } = props;

    return (
        <Button variant="ghost">
            {children}
            <ChevronDown
                size={16}
                className={cn("transition-transform duration-180 ease-out", {
                    "rotate-180": isActive,
                })}
            />
        </Button>
    );
}

interface DesktopDropdownContentProps {
    isActive: boolean;
    children: ReactNode;
    className?: string;
}

function DesktopDropdownContent(props: DesktopDropdownContentProps) {
    const { isActive, children, className } = props;

    return (
        <div
            className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 mt-2.5",
                "w-[640px] min-w-[640px] max-w-[760px] min-h-40",
                "rounded-lg border border-border-subtle bg-surface-1",
                "shadow-[0_20px_60px_rgba(0,0,0,0.5)] px-6 py-5",
                "origin-top transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-1 scale-95 pointer-events-none",
                className,
            )}
        >
            {children}
        </div>
    );
}

interface NavDesktopDropdownLinkProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function NavDesktopDropdownLink({
    href,
    icon,
    title,
    description,
}: NavDesktopDropdownLinkProps) {
    return (
        <Link
            href={href}
            className="group block rounded-lg px-3 py-2.5 no-underline!"
        >
            <div className="flex items-center gap-3.5">
                <div className="mt-0.5 flex p-2.5  items-center justify-center rounded-md bg-secondary transition-colors group-hover:bg-primary/80">
                    <div className="text-text-muted group-hover:text-text-primary transition-colors">
                        {icon}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-medium text-sm text-text-primary">
                            {title}
                        </p>

                        <span className="opacity-0 -translate-x-1.5 text-text-primary transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-2">
                            →
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground group-hover:text-text-primary">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
