"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
    const firstLayer = useRef(null);
    const secondLayer = useRef(null);
    const thirdLayer = useRef(null);

    return (
        <TransitionRouter
            auto={true}
            leave={(next) => {
                const tl = gsap
                    .timeline({
                        onComplete: next,
                    })
                    .fromTo(
                        firstLayer.current,
                        { x: "100%" },
                        {
                            x: 0,
                            duration: 0.5,
                            ease: "power2.inOut",
                        }
                    )
                    .fromTo(
                        secondLayer.current,
                        {
                            x: "100%",
                        },
                        {
                            x: 0,
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                        "<30%"
                    ).fromTo(
                        thirdLayer.current,
                        {
                            x: "100%",
                        },
                        {
                            x: 0,
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                        "<30%"
                    );

                return () => {
                    tl.kill();
                };
            }}
            enter={(next: () => void) => {
                const tl = gsap
                    .timeline()
                    .fromTo(
                        thirdLayer.current,
                        { x: 0 },
                        {
                            x: "-100%",
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                    )
                    .fromTo(
                        secondLayer.current,
                        { x: 0 },
                        {
                            x: "-100%",
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                        "<50%"
                    )
                    .fromTo(
                        firstLayer.current,
                        { x: 0 },
                        {
                            x: "-100%",
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                        "<50%"
                    )
                    .call(next, undefined, "<50%");

                return () => {
                    tl.kill();
                };
            }}
        >
            {children}
            <div
                ref={firstLayer}
                className="fixed inset-0 z-50 translate-x-full bg-primary"
            />
            <div
                ref={secondLayer}
                className="fixed inset-0 z-50 translate-x-full bg-greenSecondary"
            />
            <div
                ref={thirdLayer}
                className="fixed inset-0 z-50 translate-x-full bg-secondary flex justify-center items-center"
            >
                <p className="text-4xl text-center text-white font-[PPEditorialNew-Italic]">Hambaricho</p>
            </div>
        </TransitionRouter>
    );
}