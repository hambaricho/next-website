"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Cursor = () => {
    const cursor = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (window.innerWidth >= 768 && cursor.current) {
            const handleMouseMove = (e: MouseEvent) => {
                const { offsetWidth, offsetHeight } = cursor.current!;
                gsap.to(cursor.current, {
                    x: e.clientX - offsetWidth / 2,
                    y: e.clientY - offsetHeight / 2,
                    ease: "power2.inOut",
                    // duration: 0.5,
                });
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    });

    return (
        <div
            ref={cursor}
            className="fixed z-50 pointer-events-none w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold"
        >
            Coffee
        </div>
    );
};

export default Cursor;
