"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatedHeader } from "../ui/AnimatedHeader";
import Card from "../ui/Card";
import CardsMobile from "./CardsMobile";
import { ArrowRight } from "lucide-react";


const coffeeData = [
    {
        img: "/images/coffee/1.jpg",
        name: "Sidamo",
        cardInfo1: "Bright & Floral",
        cardInfo2: "High-Altitude Growth",
        cardInfo3: "Balanced Cup",
    },
    {
        img: "/images/coffee/2.jpg",
        name: "Yirgacheffe",
        cardInfo1: "Delicate & Elegant",
        cardInfo2: "Washed Process",
        cardInfo3: "World Renowned",
    },
    {
        img: "/images/coffee/3.jpg",
        name: "Limu",
        cardInfo1: "Mild & Aromatic",
        cardInfo2: "Citrus & Floral Notes",
        cardInfo3: "Southern Ethiopia Origin",

    },
    {
        img: "/images/coffee/4.jpg",
        name: "Guji",
        cardInfo1: "Fruity & Complex",
        cardInfo2: "Specialty Grade",
        cardInfo3: "Vibrant Character",
    },
    {
        img: "/images/coffee/5.jpg",
        name: "Jimma",
        cardInfo1: "Nutty & Chocolatey",
        cardInfo2: "Rustic Profile",
        cardInfo3: "Western Highlands Origin",
    },
    {
        img: "/images/coffee/6.jpg",
        name: "Nekemte",
        cardInfo1: "Sweet & Fruity",
        cardInfo2: "Balanced & Approachable",
        cardInfo3: "Western Ethiopia Grown",
    },
    {
        img: "/images/coffee/7.jpg",
        name: "Harrar",
        cardInfo1: "Bold & Full-Bodied",
        cardInfo2: "Wild Berry & Chocolate Notes",
        cardInfo3: "Traditional Dry-Processed",
    },
];

const cardLayout = [
    { x: -300, y: 25, rotation: -8, z: 10 },
    { x: 0, y: 25, rotation: 0, z: 10 },
    { x: 300, y: 25, rotation: 10, z: 10 },
    { x: -450, y: 500, rotation: 2, z: 10 },
    { x: -170, y: 450, rotation: 20, z: 10 },
    { x: 120, y: 500, rotation: 10, z: 10 },
    { x: 450, y: 500, rotation: -20, z: 40 }
];

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".card");
            cards.forEach((card, i) => {
                const { x, y, rotation, z } = cardLayout[i];
                gsap.set(card, { x, y, rotation, zIndex: z, duration: 0.2, ease: "power3.inOut" });
            });
        }
    }, []);

    const resetCard = (index: number) => {
        const cards = containerRef.current?.querySelectorAll(".card");
        if (!cards) return;

        const { x, y, rotation, z } = cardLayout[index];
        gsap.to(cards[index], {
            x,
            y,
            rotation,
            scale: 1,
            zIndex: z,
            duration: 0.5,
            ease: "power3.inOut",
            overwrite: "auto",
        });
    };

    const closeActive = () => {
        if (activeIndex === null) return;

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power3.inOut",
            onStart: () => {
                overlayRef.current?.classList.remove("backdrop-blur-sm");
            },
            onComplete: () => {
                if (overlayRef.current) {
                    overlayRef.current.style.zIndex = "-1";
                }
                resetCard(activeIndex);
                setActiveIndex(null);
            },
        });
    };

    const centerCard = (card: HTMLElement) => {
        const rect = card.getBoundingClientRect();

        const viewportX = window.innerWidth / 2;
        const viewportY = window.innerHeight / 2;

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const dx = viewportX - cardCenterX;
        const dy = viewportY - cardCenterY;

        gsap.to(card, {
            x: `+=${dx}`,
            y: `+=${dy}`,
            rotation: 0,
            scale: 1.2,
            zIndex: 999,
            duration: 0.6,
            ease: "back.out(1.7)",
            overwrite: "auto",
        });
    };

    const handleClick = (index: number) => {
        if (activeIndex === index) {
            closeActive();
            return;
        }

        if (activeIndex !== null) {
            // replace with smooth nav instead
            navigateCard(index > activeIndex ? "next" : "prev");
            return;
        }

        const cards = containerRef.current?.querySelectorAll(".card");
        if (!cards) return;

        setActiveIndex(index);

        if (overlayRef.current) {
            overlayRef.current.style.zIndex = "998";
        }
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => {
                overlayRef.current?.classList.add("backdrop-blur-sm");
            },
        });

        centerCard(cards[index] as HTMLElement);
    };

    const navigateCard = (direction: "next" | "prev") => {
        if (activeIndex === null) return;

        const cards = containerRef.current?.querySelectorAll(".card");
        if (!cards) return;

        const currentCard = cards[activeIndex] as HTMLElement;
        const newIndex =
            direction === "next"
                ? (activeIndex + 1) % coffeeData?.length
                : (activeIndex - 1 + coffeeData?.length) % coffeeData?.length;
        const nextCard = cards[newIndex] as HTMLElement;
        const { x, y, rotation, z } = cardLayout[activeIndex];
        gsap.to(currentCard, {
            x,
            y,
            rotation,
            scale: 1,
            zIndex: z,
            duration: 0.5,
            ease: "power3.inOut",
            overwrite: "auto",
        });

        setTimeout(() => {
            centerCard(nextCard);
            setActiveIndex(newIndex);
        }, 200);
    };

    return (
        <>
            <div className="flex flex-col items-center relative z-30">
                <a
                    href="/catalog"
                    className="md:text-xl text-center w-max relative z-10 max-w-4xl px-4 text-white font-[SuisseIntl-Regular] mb-4 rounded-full border-[1px] border-white flex items-center gap-2 transition hover:bg-white/10"
                >
                    Our Coffee
                    <ArrowRight className="w-5 h-5" />
                </a>
                <AnimatedHeader as="h2"
                    className="text-3xl md:text-6xl text-center relative z-10 md:max-w-8xl uppercase text-white font-[SuisseIntl-Bold]"
                    text="From Ethiopia&lsquo;s lands" />
                <AnimatedHeader as="h2"
                    className="text-3xl md:text-6xl text-center relative z-10 md:max-w-8xl uppercase text-white font-[SuisseIntl-Bold]"
                    text="to every horizon" />

                <p className="text-sm md:text-2xl text-center relative z-10 px-4 lg:px-2 md:max-w-4xl text-gray-200 font-[SuisseIntl-Light] lg:mb-4">
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>

            </div>

            <div ref={containerRef} className="relative w-full min-h-[140dvh] bg-secondary flex flex-col items-center justify-between pb-10 px-10">
                <CardsMobile />
                
                {/* Instruction prompt - only visible when no card is active */}
                {activeIndex === null && (
                    <div className="hidden lg:flex absolute top-1/3 right-8 flex-col items-center gap-2 pointer-events-none z-[100]">
                        <p className="text-white text-xl font-[SuisseIntl-Light] text-center">
                            Click on a card to explore
                        </p>
                        <svg 
                            className="w-10 h-10 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
                            />
                        </svg>
                    </div>
                )}
                
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/30 transition-all"
                    style={{ opacity: 0, zIndex: -1 }}
                    onClick={closeActive}
                />

                {coffeeData.map((coffee, i) => (
                    <Card
                        key={i}
                        image={coffee.img}
                        onClick={() => handleClick(i)}
                        title={coffee.name}
                        cardInfo1={coffee.cardInfo1}
                        cardInfo2={coffee.cardInfo2}
                        cardInfo3={coffee.cardInfo3}
                        className="card hidden lg:block absolute cursor-pointer" />
                ))}



                {activeIndex !== null && (
                    <>
                        {/* Left Button */}
                        <button
                            className="fixed left-4 top-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform z-[1000]"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateCard("prev");
                            }}
                        >
                            <Image src="/images/arrow.webp" alt="Previous" width={24} height={24} className="rotate-180" />
                        </button>

                        {/* Right Button */}
                        <button
                            className="fixed right-4 top-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform z-[1000]"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateCard("next");
                            }}
                        >
                            <Image src="/images/arrow.webp" alt="Next" width={24} height={24} />
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
