"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageViewer({
    src,
    alt,
}: {
    src: string;
    alt?: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <div className="cursor-zoom-in" onClick={() => setOpen(true)}>
                <Image
                    src={src}
                    alt={alt || ""}
                    width={800}
                    height={600}
                    className="rounded-xl"
                />
            </div>

            {/* Dialog */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
                    onClick={() => setOpen(false)}
                >
                    <Image
                        src={src}
                        alt={alt || ""}
                        width={1200}
                        height={900}
                        className="rounded-xl max-h-[90vh] w-auto"
                    />
                </div>
            )}
        </>
    );
}
