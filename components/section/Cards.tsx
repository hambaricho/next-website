"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatedHeader } from "../ui/AnimatedHeader";
import Card from "../ui/Card";
import { MaskText } from "../ui/MaskTextAnimation";
import CardsMobile from "./CardsMobile";


const coffeeData = [
    {
        img: "/images/coffee/1.jpg",
        name: "Yirgacheffe",
        origin: "Southern Ethiopia, high-altitude plantations (4,900–7,225 ft)",
        grade1: "Washed: Sidamo Grade 1 & 2",
        grade2: "Natural: Sidamo Grade 2, 3, 4, UG",
        flavor: "Delicate & Elegant – tea-like body with floral aromas. Washed Process – enhances clarity and brightness. World-Renowned – one of Ethiopia’s most celebrated coffees.",
        altitude: "1,800–2,200 m",
        processing: "Washed & Natural",
        body: "Light to medium, tea-like",
        acidity: "9/10 (floral, lemony, very lively)",
        weight: "Light",
        available: "Washed: Sidamo Grade 1 & 2 | Natural: Sidamo Grade 2, 3, 4, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Celebrated worldwide, Yirgacheffe coffee comes from Ethiopia’s lush mountains and is carefully washed for clarity. Expect delicate floral notes, bright citrus flavors, and a tea-like body — a refined and elegant brew for true coffee enthusiasts.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/2.jpg",
        name: "Sidamo",
        origin: "Yirgacheffe, Southern Ethiopia (high-altitude 5,900–7,200 ft)",
        grade1: "Washed: Yirgacheffe Grade 1 & 2",
        grade2: "Natural: Yirgacheffe Grade 3, 4, UG",
        flavor: "Bright & Floral – citrus and jasmine notes. High-Altitude Growth – slow-grown for rich flavor. Balanced Cup – smooth body with elegant acidity.",
        altitude: "1,500–2,200 m",
        processing: "Washed & Natural",
        body: "Medium, smooth",
        acidity: "7/10 (bright, citrusy)",
        weight: "Medium",
        available: "Washed: Yirgacheffe Grade 1 & 2 | Natural: Yirgacheffe Grade 3, 4, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Grown in the highlands of southern Ethiopia, Sidamo coffee is handpicked for its exceptional quality. This coffee offers bright acidity, floral aromas, and hints of citrus and jasmine, delivering a smooth and balanced cup that represents Ethiopia’s rich coffee heritage.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/3.jpg",
        name: "Limu",
        origin: "Western Ethiopia (1,300–1,900 m)",
        grade1: "Washed: Limu Grade 2",
        grade2: "Natural: Limu Grade 3, 4, UG",
        flavor: "Chocolatey & Well-Rounded – lingering, satisfying finish. Subtle Fruit & Spice – vibrant yet refined flavor. Southwestern Highlands – high-altitude, wet-processed quality.",
        altitude: "1,500–2,000 m",
        processing: "Washed & Natural",
        body: "Medium, balanced",
        acidity: "6/10 (sweet, subtle spice)",
        weight: "Medium",
        available: "Washed: Limu Grade 2 | Natural: Limu Grade 3, 4, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Cultivated in the southwestern highlands, Limu coffee is known for its well-rounded body, chocolatey richness, subtle fruity and spice notes, and a lingering finish. A clean, vibrant cup that highlights Ethiopia’s premium coffee quality.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/4.jpg",
        name: "Guji",
        origin: "Guji Zone, Southern Ethiopia (5,900–7,200 ft)",
        grade1: "Washed: Guji Grade 1 & 2",
        grade2: "Natural: Guji Grade 2, 3, 4, UG",
        flavor: "Fruity & Complex – berry and tropical notes. Specialty Coffee Region – emerging hotspot for premium beans. Vibrant Character – lively and memorable cup.",
        altitude: "1,600–2,200 m",
        processing: "Washed & Natural",
        body: "Medium, velvety",
        acidity: "8/10 (fruity-sweet, complex)",
        weight: "Medium",
        available: "Washed: Guji Grade 1 & 2 | Natural: Guji Grade 2, 3, 4, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "From the fertile Guji region, these beans are known for their vibrant, fruity sweetness and complex flavors, often featuring berry and tropical fruit notes. Guji coffee offers a lively, memorable cup with rich Ethiopian character.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/5.jpg",
        name: "Jimma",
        origin: "Jimma Zone, Oromia Region (sun-dried, 1,400–2,000 m)",
        grade1: "Natural: Jimma Grade 4, 5, UG",
        grade2: "",
        flavor: "Nutty & Chocolatey – smooth, approachable flavor. Rustic Profile – versatile for blends or single-origin. Western Highlands Origin – earthy Ethiopian character.",
        altitude: "1,350–2,000 m",
        processing: "Natural (Dry-Processed)",
        body: "Medium, rustic",
        acidity: "4/10 (nutty, smooth, low brightness)",
        weight: "Medium-heavy",
        available: "Natural: Jimma Grade 4, 5, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Jimma coffee comes from western Ethiopia and delivers a rustic, smooth cup with nutty and chocolatey flavors. Its well-rounded profile makes it versatile — perfect for blends or as a standalone brew.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/6.jpg",
        name: "Nekemte",
        origin: "Wollega (Nekemte) region, Western Ethiopia",
        grade1: "Natural: Lekempti Grade 4, 5, UG",
        grade2: "",
        flavor: "Sweet & Fruity – subtle fruity tones with medium body. Balanced & Approachable – ideal for everyday enjoyment. Western Ethiopia Grown – premium highland coffee.",
        altitude: "1,500–2,000 m",
        processing: "Natural (Dry-Processed)",
        body: "Medium, round",
        acidity: "5/10 (mild fruitiness)",
        weight: "Medium",
        available: "Natural: Lekempti Grade 4, 5, UG",
        packaging: "30 Kg, 60 Kg, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Grown in Ethiopia’s western highlands, Nekemte coffee is sweet, medium-bodied, and lightly fruity, offering a balanced and approachable cup. Its smooth flavor makes it a satisfying choice for everyday enjoyment.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
    {
        img: "/images/coffee/7.jpg",
        name: "Harrar",
        origin: "Harari Region, Eastern Ethiopia (sun-dried at 4,900–6,200 ft)",
        grade1: "Natural: Harrar Grade 2, 3, 4, 5, UG",
        grade2: "",
        flavor: "Bold & Full-Bodied – strong, earthy flavor. Wild Berry & Chocolate Notes – unique wine-like profile. Traditional Dry-Processed – classic Ethiopian heritage.",
        altitude: "1,400–1,900 m",
        processing: "Natural (Dry-Processed)",
        body: "Full, heavy",
        acidity: "5/10 (wine-like, mild)",
        weight: "Heavy",
        available: "Natural: Harrar Grade 2, 3, 4, 5, UG",
        packaging: "30 Kg, 50 Kg, 60 Kg Bulk Bags (Jute or Polypropylene)",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "One of Ethiopia’s oldest coffee regions, Harrar produces bold, full-bodied beans with wild berry, chocolate, and wine-like notes. Naturally processed, it has a distinct earthy character and a powerful, traditional flavor.",
        loadability: "20ft container: 320 bags / 19,200 kg"
    },
];

const cardLayout = [
    { x: -300, y: 25, rotation: -8, z: 10 },
    { x: 0, y: 25, rotation: 0, z: 10 },
    { x: 300, y: 25, rotation: 10, z: 10 },
    { x: -450, y: 500, rotation: 2, z: 10 },
    { x: -170, y: 450, rotation: 20, z: 10 },
    { x: 120, y: 500, rotation: 10, z: 10 },
    { x: 450, y: 500, rotation: -20, z: 1 }
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
                <p className="text-xl text-center w-max relative z-10 max-w-4xl px-4 text-white font-[SuisseIntl-Regular] mb-4 rounded-full border-[1px] border-white">
                    Our Coffee
                </p>
                <AnimatedHeader as="h2"
                    className="text-[1.6rem] md:text-6xl text-center relative z-10 md:max-w-8xl uppercase text-white font-[SuisseIntl-Bold] mb-1"
                    text="From Ethiopia&lsquo;s lands" />
                <AnimatedHeader as="h2"
                    className="text-[1.6rem] md:text-6xl text-center relative z-10 md:max-w-8xl uppercase text-white font-[SuisseIntl-Bold] mb-1"
                    text="to every horizon" />

                <MaskText className="md:text-2xl text-center relative z-10 md:max-w-4xl text-gray-200 font-[SuisseIntl-Light] mb-4"
                    text='Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.'
                />

            </div>

            <div ref={containerRef} className="relative w-full min-h-[140dvh] bg-secondary flex flex-col items-center justify-between pt-6 md:pt-1 pb-10 px-10">
                <CardsMobile />
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
                        origin={coffee.origin}
                        grade1={coffee.grade1}
                        grade2={coffee.grade2!}
                        altitude={coffee.altitude}
                        processing={coffee.processing}
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

                {/* <Button text="View Catalog" className="px-6 py-3 bg-primary border border-white text-white font-[SuisseIntl-Regular] absolute bottom-0" /> */}
            </div>
        </>
    );
}
