"use client"
import Image from "next/image"
import Button from "../ui/Button"
import { Link } from "next-transition-router"
import Copy from "../ui/Copy/Copy"

export default function ExportHero() {
    return (
        <section className="relative z-30 flex flex-col items-center justify-center md:min-h-[100dvh] bg-secondary py-12 md:py-20">

            <div className="hidden md:block absolute top-0 left-0  w-full -translate-y-1">
                <Image src="/images/greenBg.svg" alt="zigzag border" width={1600} height={80} className="w-full select-none pointer-events-none" />
            </div>
            <div className="w-full h-full bg-primary px-4">
                <div className=" mb-6 flex justify-center relative z-10">
                    <Image src="/images/organic.webp" alt="Organic badge" width={120} height={120} className="mx-auto" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <Copy animateOnScroll>
                        <h1 className="text-5xl md:text-8xl font-[SuisseIntl-Bold] text-white">
                            Global Reach<br />
                            <span className="text-5xl md:text-8xl font-[SuisseIntl-Bold] text-white/90">Grounded In Origin.</span>
                        </h1>
                    </Copy>
                    <p className="max-w-3xl mx-auto text-base md:text-lg font-[SuisseIntl-Light] text-white/90 mb-4 mt-4">
                        We bridge the distance with seamless global logistics. Our expert team manages the entire export process from meticulous documentation to bespoke packaging, ensuring your coffee arrives with its quality and story intact.
                    </p>
                    <Link href="/services">
                        <Button text="Order Now" className=" bg-secondary text-white border border-white" />
                    </Link>
                </div>
            </div>

            <div className="hidden lg:flex absolute bottom-0 -z-0 left-0 w-full translate-y-1 rotate-180">
                <Image src="/images/greenBg.svg" alt="zigzag border" width={1600} height={80} className="w-full select-none pointer-events-none" />
            </div>
        </section>
    )
}
