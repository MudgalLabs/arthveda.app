"use client";

import { useEffect, useState } from "react";
import { GetStarted } from "@/components/get_started";

export default function FloatingGetStarted() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const hero = document.getElementById("hero-cta");
        const footer = document.getElementById("bottom-cta");

        let pastHero = false;
        let nearFooter = false;

        const update = () => {
            setShow(pastHero && !nearFooter);
        };

        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                pastHero = !entry.isIntersecting;
                update();
            },
            { threshold: 0.1 },
        );

        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                nearFooter = entry.isIntersecting;
                update();
            },
            {
                rootMargin: "-200px 0px -100px 0px",
            },
        );

        if (hero) heroObserver.observe(hero);
        if (footer) footerObserver.observe(footer);

        return () => {
            heroObserver.disconnect();
            footerObserver.disconnect();
        };
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
                <GetStarted />
            </div>
        </div>
    );
}
