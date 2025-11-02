"use client"
import Image from 'next/image';
import React from 'react'
import { AnimatedHeader } from '@/components/ui/AnimatedHeader';
import Button from '@/components/ui/Button';

const steps = [
    {
        num: "01",
        title: "Sustainable Sourcing",
        text: "Ethically produced with traceable origins from trusted Ethiopian farmers.",
        img: "/images/service/s3.jpeg",
    },
    {
        num: "02",
        title: "Raw Bean Selection",
        text: "Choose from a wide range of specialty and commercial coffees, matched to your quality and profile needs.",
        img: "/images/service/s4.jpeg",
    },
    {
        num: "03",
        title: "Import & Logistics Support",
        text: "Guidance with documentation, shipping, and international trade compliance to ensure smooth delivery.",
        img: "/images/service/s5.jpeg",
    },
    {
        num: "04",
        title: "Customizable Export Options",
        text: "From small specialty shipments to full container loads, tailored to your business requirements.",
        img: "/images/service/s6.jpeg",
    },
];

const ServiceClient = () => {
    return (
        <main className="min-h-screen bg-white dark:bg-secondary pt-14 md:pt-28 pb-10">
            <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12">
                <header className="text-center mb-16">
                    <p className="font-[PPEditorialNew-Italic] text-lg text-primary dark:text-white">
                        From Bean to Bag
                    </p>
                    <AnimatedHeader as='h1' text='A Journey of' className='font-[SuisseIntl-Bold] text-4xl md:text-8xl text-primary dark:text-white' />
                    <AnimatedHeader as='h1' text='Unwavering Quality' className='font-[SuisseIntl-Bold] text-4xl md:text-8xl text-primary dark:text-white' />
                    <p className="mt-4 text-primary dark:text-white font-[SuisseIntl-Light] md:text-lg max-w-2xl mx-auto">
                        Every coffee bean has a story. Ours is one of meticulous care, expert
                        craftsmanship, and a commitment to excellence at every single stage.
                    </p>
                </header>

                {/* Steps */}
                <section className="grid md:grid-cols-2 gap-12 relative">
                    <div className='h-full w-[2px] bg-primary absolute top-1/2 left-1/2 -translate-y-1/2 hidden lg:flex'></div>
                    {steps.map((s, idx) => (
                        <div key={s.num} className={`flex ${idx % 2 === 0 ? 'flex-col' : 'flex-col-reverse'} gap-4`}>
                            <div>
                                <div className="flex flex-col items-start gap-4">
                                    <span className="font-[PPEditorialNew-Italic] text-5xl text-primary/50">
                                        {s.num}
                                    </span>
                                    <AnimatedHeader as='h2' text={s.title} className='font-[SuisseIntl-Bold] text-2xl md:text-3xl text-primary dark:text-white' />
                                </div>
                                <p className="text-primary dark:text-white font-[SuisseIntl-Light]">{s.text}</p>
                            </div>
                            <div className="relative w-full h-52 md:h-56 lg:h-64">
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill
                                    className="object-cover img"
                                />
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <section className="bg-primary min-h-screen flex flex-col justify-center text-white py-16 px-4 md:py-16 relative">

                <Image
                    src="/images/organic.webp"
                    alt="Organic Coffee Badge hambaricho"
                    width={120}
                    height={120}
                    className="object-cover absolute -top-10 left-1/2 -translate-x-1/2 w-24 md:w-28"
                />
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <AnimatedHeader as='h2' text='Packaging &' className='font-[SuisseIntl-Bold] text-5xl md:text-8xl text-white' />
                    <AnimatedHeader as='h2' text='Specifications' className='font-[SuisseIntl-Bold] text-5xl md:text-8xl text-white' />

                    <p className="max-w-2xl mx-auto text-white md:text-lg font-[SuisseIntl-Light]">
                        Your coffee deserves the best protection from farm to shipment.
                        Hambaricho Coffee ensures international-standard packaging and
                        handling.
                    </p>
                </div>

                {/* Two-column grid for details */}
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-10">
                        <div>
                            <h3 className="font-[SuisseIntl-Bold] text-2xl border-b border-white pb-2 mb-4">
                                Packaging Details
                            </h3>
                            <ul className="space-y-2 text-white font-[SuisseIntl-Light]">
                                <li>› 60 kg jute bags with optional GrainPro lining</li>
                                <li>› Bulk container solutions for larger shipments</li>
                                <li>› Custom packing requests available</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-[SuisseIntl-Bold] text-2xl border-b border-white pb-2 mb-4">
                                Container Loadability <span className="text-sm">(approx.)</span>
                            </h3>
                            <ul className="space-y-2 text-white font-[SuisseIntl-Light]">
                                <li>› 20 ft container: 19.2 MT (≈320 bags)</li>
                                <li>› 40 ft container: 25.6 MT (≈420 bags)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        <div>
                            <h3 className="font-[SuisseIntl-Bold] text-2xl border-b border-white pb-2 mb-4">
                                Processing & Preparation
                            </h3>
                            <ul className="space-y-2 text-white font-[SuisseIntl-Light]">
                                <li>› Available as washed or natural (depending on origin)</li>
                                <li>› Graded and cleaned for export</li>
                                <li>› Garbling status available upon request</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-[SuisseIntl-Bold] text-2xl border-b border-white pb-2 mb-4">
                                Shelf Life
                            </h3>
                            <p className="text-white font-[SuisseIntl-Light]">
                                › Up to 24 months in proper storage conditions, preserving the
                                bean’s quality and flavor profile.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='md:h-[100dvh] w-full flex flex-col justify-center items-center gap-6 md:gap-12 bg-white dark:bg-secondary py-12'>
                <p className='text-primary font-[SuisseIntl-Bold] max-w-4xl text-5xl md:text-8xl text-center mx-auto'>
                    Export with Confidence
                </p>

                <Button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    text='Contact Us'
                    className='bg-primary text-white mx-auto'
                />

            </div>
        </main>
    )
}

export default ServiceClient