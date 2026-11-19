import type { ReactNode } from "react";
import Link from "next/link";

// Shared prose for /updates post bodies, matching the hand-rolled pieces in
// the first posts (benchmark_widget.tsx and friends).

export const H2 = ({ children }: { children: ReactNode }) => (
    <h2 className="mt-12 font-heading text-[24px] font-medium leading-snug tracking-[-0.01em] text-text-primary">
        {children}
    </h2>
);

export const P = ({ children }: { children: ReactNode }) => (
    <p className="mt-4 font-content text-[16px] leading-[1.7] text-text-muted">{children}</p>
);

export const Strong = ({ children }: { children: ReactNode }) => (
    <strong className="font-medium text-text-primary">{children}</strong>
);

export const UL = ({ children }: { children: ReactNode }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 font-content text-[16px] leading-[1.7] text-text-muted">{children}</ul>
);

// An inline link in body text. The global `a` rule (globals.css) sets
// text-sm and font-medium; `!` beats it so the link matches the line it sits
// in. External URLs open in a new tab.
export const A = ({ href, children }: { href: string; children: ReactNode }) => {
    const className = "text-[length:inherit]! leading-[inherit]! font-normal! underline underline-offset-4";
    return href.startsWith("/") ? (
        <Link href={href} className={className}>
            {children}
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener" className={className}>
            {children}
        </a>
    );
};

// A quiet aside for a later change to a backfilled post ("Since then, ...").
export const Since = ({ children }: { children: ReactNode }) => (
    <div className="mt-10 rounded-lg border border-white/[0.10] bg-surface-1/40 px-5 py-4 font-content text-[15px] leading-[1.65] text-text-muted">
        {children}
    </div>
);

// The founder's sign-off on journey posts.
export const SignOff = () => (
    <p className="mt-10 font-content text-[15px] text-text-subtle">
        <A href="https://ceoshikhar.com">Shikhar</A>
        , building Arthveda
    </p>
);
