import type { ReactNode } from "react";

import MarkUpdatesSeen from "@/components/mark_updates_seen";

export default function UpdatesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <MarkUpdatesSeen />
            {children}
        </>
    );
}
