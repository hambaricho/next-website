"use client"
import Image from "next/image"
import Button from "../ui/Button"

export default function ExportHero() {
    return (
        <section className="relative z-30 flex flex-col items-center justify-center md:min-h-[80vh] bg-primary px-4 py-12 md:py-20">
            {/* Top zigzag border */}
            <div className="hidden md:block absolute -top-4 md:-top-16 left-0  w-full -translate-y-1">
                <Image src="/images/greenBg.svg" alt="zigzag border" width={1600} height={80} className="w-full select-none pointer-events-none" />
            </div>

            {/* Organic badge/logo */}
            <div className="mt- mb-6 flex justify-center relative z-10">
                <Image src="/images/organic.webp" alt="Organic badge" width={120} height={120} className="mx-auto" />
            </div>

            {/* Main content */}
            <div className="max-w-3xl mx-auto text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-[SuisseIntl-Bold] text-white">
                    Global Reach<br />
                    <span className="text-5xl md:text-7xl font-[SuisseIntl-Bold] text-white/90">Grounded In Origin.</span>
                </h1>
                <p className="text-base md:text-lg font-[SuisseIntl-Light] text-white/90 mb-4 mt-4">
                    We bridge the distance with seamless global logistics. Our expert team manages the entire export process from meticulous documentation to bespoke packaging, ensuring your coffee arrives with its quality and story intact.
                </p>
                <Button text="Place Your Order" className="px-6 py-3 bg-secondary text-white font-[SuisseIntl-Regular]" />
            </div>

            {/* Bottom zigzag border */}
            <div className="absolute -bottom-8 md:-bottom-16 -z-0 left-0 w-full translate-y-1 rotate-180">
                <Image src="/images/greenBg.svg" alt="zigzag border" width={1600} height={80} className="w-full select-none pointer-events-none" />
            </div>
        </section>
    )
}
