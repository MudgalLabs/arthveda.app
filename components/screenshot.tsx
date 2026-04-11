import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

export function Screenshot(props: ImageProps) {
    const { className, ...restProps } = props;
    return (
        <div className="w-full mx-auto sm:p-2 md:p-4 rounded-sm sm:rounded-md flex justify-center items-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                width={1600}
                height={900}
                className={cn(
                    "w-full h-auto outline-offset-1 outline-1 md:outline-1 hover:outline-border-hover outline-border-soft rounded-sm sm:rounded-md animate-slide-in-bottom scale-[1.0] hover:scale-[1.05] transition-transform duration-300 ease-out",
                    className,
                )}
                loading="eager"
                {...restProps}
            />
        </div>
    );
}
