"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import Button from "../ui/Button"
import { useGSAP } from "@gsap/react"
import SVGLine from "../ui/SVGLine"

gsap.registerPlugin(ScrollTrigger, SplitText)

const Landing = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const pRef = useRef<HTMLParagraphElement>(null)
    const birds1Ref = useRef<HTMLImageElement>(null)
    const birds2Ref = useRef<HTMLImageElement>(null)
    const birds3Ref = useRef<HTMLImageElement>(null)
    const bg2Ref = useRef<HTMLImageElement>(null)
    const bg1Ref = useRef<HTMLImageElement>(null)

    useGSAP(() => {
        if (h1Ref.current && pRef.current) {
            const h1Split = new SplitText(h1Ref.current, { type: "words,chars" })
            const pSplit = new SplitText(pRef.current, { type: "words" })

            gsap.from(h1Split.chars, {
                x: 50,
                rotationY: -90,
                duration: 1,
                stagger: 0.01,
                ease: "back.out(1.7)",
            })

            gsap.from(pSplit.words, {
                y: 50,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.inOut",
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


    return (
        <div ref={containerRef} className="min-h-[90dvh] md:min-h-[160dvh] relative z-10 flex flex-col items-center bg-gray-100 pt-24 md:pt-32 overflow-hidden">
            <div ref={textRef} className="text-center z-20 relative flex flex-col items-center">
                {/* Screen reader only versions */}
                <h1 className="sr-only">
                    From Ethiopia&lsquo;s highlands to your roastery
                </h1>
                <p className="sr-only">
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>

                {/* Animated versions */}
                <h1
                    ref={h1Ref}
                    className="text-4xl md:text-6xl text-center max-w-8xl px-4 uppercase text-secondary  font-[SuisseIntl-Bold] mb-1"
                    aria-hidden="true"
                >
                    From ethiopia&lsquo;s <br /> highlands to your roastery
                </h1>
                <p
                    ref={pRef}
                    className="md:text-2xl text-center max-w-sm md:max-w-4xl px-4 text-gray-700 font-[SuisseIntl-Light] mb-4"
                    aria-hidden="true"
                >
                    Hambaricho Coffee exports premium Ethiopian green beans directly
                    from trusted producers, rooted in heritage, delivered with reliability.
                </p>
                <Button text="ABOUT US" className="bg-primary landing-button origin-top" />
            </div>

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
            <SVGLine />
            <Image
                ref={bg1Ref}
                src="/images/bg1.svg"
                alt="Ethiopian coffee beans"
                width={800}
                height={400}
                priority
                className="w-screen absolute z-20 object-cover bottom-0 md:-bottom-50"
            />
        </div>
    )
}

export default Landing