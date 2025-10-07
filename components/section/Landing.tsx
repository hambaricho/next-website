"use client"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import { useRef } from "react"
import { AnimatedHeader } from "../ui/AnimatedHeader"
import Button from "../ui/Button"
import { Link } from "next-transition-router"
import Marquee from "../ui/Marquee"
import SVGLine from "../ui/SVGLine"

gsap.registerPlugin(ScrollTrigger, SplitText)

const Landing = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const h1Ref = useRef<HTMLHeadingElement>(null)

    const birds1Ref = useRef<HTMLImageElement>(null)
    const birds2Ref = useRef<HTMLImageElement>(null)
    const birds3Ref = useRef<HTMLImageElement>(null)
    const bg2Ref = useRef<HTMLImageElement>(null)
    const bg1Ref = useRef<HTMLImageElement>(null)

    useGSAP(() => {
        if (h1Ref.current) {
            const h1Split = new SplitText(h1Ref.current, { type: "words,chars" })

            gsap.from(h1Split.chars, {
                x: 50,
                rotationY: -90,
                duration: 1,
                stagger: 0.01,
                ease: "back.out(1.7)",
            })

            gsap.from(".landing-button", {
                scaleY: 0,
                autoAlpha: 0,
                duration: 1,
                ease: "power2.inOut",
            })
        }
    })

    useGSAP(() => {
        if (window.innerWidth >= 768) {
            gsap.to(bg2Ref.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: true,
                },
                y: 160,
            });

            gsap.to(birds1Ref.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: true,
                },
                y: 100,
                x: 40,
            });
            gsap.to(birds2Ref.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: true,
                },
                y: 120,
                x: -60,
            });
            gsap.to(birds3Ref.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: true,
                },
                y: 80,
                x: 30,
            });

            gsap.to(bg1Ref.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    scrub: true,
                },
                y: -180,
            });
        }
    })

    // useGSAP(() => {
    //     if (window.innerWidth >= 768) {

    //         let svg = document.querySelector('.svg-line');
    //         let path = svg?.querySelector('path');

    //         const pathLength = path?.getTotalLength();
    //         console.log(pathLength);
    //         gsap.set(path!, {strokeDasharray: 10})
    //     }
    // })


    return (
        <div ref={containerRef} className="min-h-[100dvh] md:min-h-[170dvh] relative z-10 flex flex-col transition-colors duration-300 items-center bg-gray-100 dark:bg-primary-dark
         pt-24 md:pt-44 overflow-hidden">
            <div ref={textRef} className="text-center mt-8 z-20 relative flex flex-col items-center">
                {/* Screen reader only versions */}
                <h1 className="sr-only">
                    From Ethiopia&lsquo;s highlands to your roastery
                </h1>
                <p className="sr-only">
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>

                {/* Animated versions */}

                <AnimatedHeader as="h1"
                    className="text-4xl md:text-6xl text-center max-w-[870px] px-4 uppercase text-secondary dark:text-gray-100 font-[SuisseIntl-Bold] mb-1"
                    text="From Ethiopia&lsquo;s" />
                <AnimatedHeader as="h1"
                    className="text-4xl md:text-6xl text-center max-w-8xl px-4 uppercase text-secondary dark:text-gray-100 font-[SuisseIntl-Bold] mb-1"
                    text="highlands to your roastery" />
                <p className="md:text-xl text-center max-w-sm md:max-w-3xl px-4 text-gray-700 dark:text-gray-300 font-[SuisseIntl-Light] mb-4">
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>
                <Link href="/story">
                    <Button text="ABOUT US" className="bg-primary landing-button origin-top" />
                </Link>
            </div>

            {/* <SVGLine /> */}
            <Image
                ref={birds1Ref}
                src="/images/svg/birds.svg"
                alt="birds hambaricho"
                width={100}
                height={100}
                priority
                className="w-12 md:w-40 absolute top-2/3 md:top-1/3 left-40"
            />
            <Image
                ref={birds2Ref}
                src="/images/svg/morebirds.svg"
                alt="birds hambaricho"
                width={100}
                height={100}
                priority
                className="w-12 md:w-40 absolute top-2/3 md:top-1/3 right-1/2"
            />
            <Image
                ref={birds3Ref}
                src="/images/svg/evenmorebirds.svg"
                alt="birds hambaricho"
                width={100}
                height={100}
                priority
                className="w-12 md:w-40 absolute top-3/5 md:top-2/5 right-1/2"
            />

            <Image
                ref={bg2Ref}
                src="/images/bg2.svg"
                alt="Ethiopian highlands hambaricho"
                width={800}
                height={400}
                priority
                className="w-screen absolute bottom-20 md:bottom-20"
            />

            <Image
                src="/images/bg.svg"
                alt="Ethiopian highlands hambaricho"
                width={800}
                height={400}
                priority
                className="w-screen absolute bottom-6 md:-bottom-30"
            />
            <Image
                ref={bg1Ref}
                src="/images/bg1.svg"
                alt="Ethiopian coffee beans"
                width={800}
                height={400}
                priority
                className="w-screen absolute z-20 object-cover bottom-0 md:-bottom-52"
            />

            <Marquee className="hidden lg:flex absolute bottom-0 mb-24 w-full left-0 z-30" />
        </div>
    )
}

export default Landing