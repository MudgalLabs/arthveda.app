"use client";

import { useEffect, useState } from "react";
import { GetStarted } from "./get_started";

export default function FloatingGetStarted() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShow(window.scrollY > 150);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`fixed z-40 transition-all duration-300 ${
                show
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none translate-y-4"
            }
            w-full flex justify-center sm:justify-end
            bottom-8 left-0 px-4
            `}
        >
            <div className="sm:mr-16">
                <GetStarted shortened />
            </div>
        </div>
    );
}
