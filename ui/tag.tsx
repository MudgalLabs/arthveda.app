import { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
    "w-fit flex items-center justify-center rounded-sm border-1",
    {
        variants: {
            variant: {
                primary:
                    "bg-surface-bg border-surface-border text-surface-foreground",
                muted: "bg-muted border-border text-foreground",
            },
            size: {
                default: "text-sm px-3 py-1 font-medium",
                small: "text-xs px-1.5 py-0.5 font-normal",
            },
        },
        defaultVariants: {
            variant: "muted",
            size: "default",
        },
    }
);

interface TagProps extends VariantProps<typeof tagVariants> {
    children: ReactNode;
    className?: string;
}

function Tag(props: TagProps) {
    const { children, className, variant = "muted", size = "default" } = props;
    return (
        <div className={cn(tagVariants({ variant, size, className }))}>
            {children}
        </div>
    );
}

export { Tag };
export type { TagProps };
