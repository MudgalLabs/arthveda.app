import type { LucideIcon } from "lucide-react";

// The small uppercase family-name eyebrow shown above headings (homepage
// product blocks + the hub-page heroes). The icon — the same one used in the
// Product nav dropdown — sits before the name as a visual cue, so a family is
// recognizable at a glance wherever it appears.
export function FamilyLabel({ name, Icon }: { name: string; Icon: LucideIcon }) {
    return (
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-accent">
            <Icon size={16} aria-hidden className="text-accent" />
            {name}
        </p>
    );
}
