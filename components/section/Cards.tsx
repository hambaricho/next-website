"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Button from "../ui/Button";
import Card from "../ui/Card";
import CardsMobile from "./CardsMobile";


const coffees = [
    {
        img: "/images/gallery.jpg",
        name: "Yirgacheffe",
        origin: "Yirgacheffe Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2",
        grade2: "Natural - Grade 1, 2, 3",
        flavor: "Floral, citrus, tea-like",
        altitude: "1,700–2,200m",
        processing: "Washed, some natural",
    },
    {
        img: "/images/gallery.jpg",
        name: "Sidamo",
        origin: "Sidamo Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2 ",
        grade2: "Natural - Grade 2, 3, 4",
        flavor: "Fruity, balanced, chocolate hints",
        altitude: "1,500–2,200m",
        processing: "Washed & natural",
    },
    {
        img: "/images/gallery.jpg",
        name: "Limu",
        origin: "Limu Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2 ",
        grade2: "Natural - Grade 3, 4",
        flavor: "Spicy, winey, soft acidity",
        altitude: "1,100–1,900m",
        processing: "Primarily washed",
    },
    {
        img: "/images/gallery.jpg",
        name: "Guji",
        origin: "Guji Zone, Ethiopia",
        grade1: "Washed - Grade 1 and 2",
        grade2: "Natural - Grade 2, 3, 4, UG",
        flavor: "Fruity, floral, berry notes",
        altitude: "1,500–2,350m",
        processing: "Washed & natural",
    },
    {
        img: "/images/gallery.jpg",
        name: "Jimma",
        origin: "Jimma Zone, Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 3",
        flavor: "Earthy, full-bodied, mild fruit",
        altitude: "1,400–2,100m",
        processing: "Mostly natural, some washed",
    },
    {
        img: "/images/gallery.jpg",
        name: "Nekemte",
        origin: "Nekemte (East Wollega), Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 2, 3",
        flavor: "Sweet, fruity, winey with spice",
        altitude: "1,700–2,200m",
        processing: "Predominantly natural",
    },
    {
        img: "/images/gallery.jpg",
        name: "Harar",
        origin: "Eastern Highlands, Ethiopia",
        grade1: "Natural - Grade 4, 5, Mocha Harrar",
        flavor: "Bold, winey, chocolatey",
        altitude: "1,400–2,000m",
        processing: "Sun-dried (natural)",
    },
];


const cardLayout = [
    { x: -400, y: 200, rotation: 8, z: 3 },
    { x: 0, y: 200, rotation: 0, z: 2 },
    { x: 450, y: 200, rotation: -30, z: 3 },
    { x: -550, y: 600, rotation: 2, z: 2 },
    { x: -270, y: 550, rotation: -20, z: 1 },
    { x: 120, y: 600, rotation: 10, z: 1 },
    { x: 550, y: 600, rotation: -20, z: 1 }

    // { x: -400, y: 500, rotation: 8, z: 3 },
    // { x: 0, y: 500, rotation: 0, z: 2 },
    // { x: 450, y: 500, rotation: -30, z: 3 },
    // { x: -550, y: 900, rotation: 2, z: 2 },
    // { x: -270, y: 850, rotation: -20, z: 1 },
    // { x: 120, y: 900, rotation: 10, z: 1 },
    // { x: 550, y: 800, rotation: 20, z: 1 },
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
                ? (activeIndex + 1) % coffees.length
                : (activeIndex - 1 + coffees.length) % coffees.length;
        const nextCard = cards[newIndex] as HTMLElement;

        // Animate current card back to its layout
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
        <div ref={containerRef} className="w-full min-h-[180dvh] bg-secondary flex flex-col items-center justify-between overflow-hidden pt-6 md:pt-1 pb-10 px-10">

            <div className="flex flex-col items-center">
                <p className="text-xl text-center w-max relative z-10 max-w-4xl px-4 text-white font-[SuisseIntl-Regular] mb-4 rounded-full border-[1px] border-white">
                    Our Coffee
                </p>
                <h2 className="text-[1.6rem] md:text-6xl text-center relative z-10 md:max-w-8xl uppercase text-white font-[SuisseIntl-Bold] mb-1">
                    From ethiopia&lsquo;s lands <br /> to every horizon
                </h2>
                <p className="md:text-2xl text-center relative z-10 md:max-w-4xl text-gray-200 font-[SuisseIntl-Light] mb-4">
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>
            </div>

            <div className="w-full flex flex-col items-center md:items-end justify-center">
                <Button text="Catalogue" className="bg-primary text-black w-max border-2 border-white" />
            </div>

            <CardsMobile />
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/30 transition-all"
                style={{ opacity: 0, zIndex: -1 }}
                onClick={closeActive}
            />

            {coffees.map((coffee, i) => (

                // <Image
                //     src={coffee.img}
                //     alt={coffee.name}
                //     width={300}
                //     height={480}
                //     key={i}
                //     onClick={() => handleClick(i)}
                //     className="card w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer object-cover hidden lg:flex"
                // />
                <Card
                    key={i}
                    image={coffee.img}
                    onClick={() => handleClick(i)}
                    title={coffee.name}
                    origin={coffee.origin}
                    grade1={coffee.grade1}
                    grade2={coffee.grade2!}
                    flavor={coffee.flavor}
                    altitude={coffee.altitude}
                    processing={coffee.processing}
                    className="card hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
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
    );
}
