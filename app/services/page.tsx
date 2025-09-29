import Image from 'next/image';
import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "From Bean to Bag | A Journey of Unwavering Quality",
    description:
        "Experience the meticulous process of Ethiopian coffee sourcing, selection, and export. Sustainable sourcing, expert logistics, and customizable export options.",
    keywords: [
        "Ethiopian coffee export",
        "raw bean selection",
        "sustainable sourcing",
        "coffee logistics",
    ],
    openGraph: {
        title: "From Bean to Bag | A Journey of Unwavering Quality",
        description:
            "Sustainable sourcing and export of premium Ethiopian coffee with complete traceability and expert logistics.",
        url: "https://yourdomain.com/journey",
        images: [
            {
                url: "/images/og-journey.jpg",
                width: 1200,
                height: 630,
                alt: "Coffee beans journey from Ethiopia",
            },
        ],
    },
};

const steps = [
    {
        num: "01",
        title: "Sustainable Sourcing",
        text: "Ethically produced with traceable origins from trusted Ethiopian farmers.",
        img: "/images/sourcing.jpg",
    },
    {
        num: "02",
        title: "Raw Bean Selection",
        text: "Choose from a wide range of specialty and commercial coffees, matched to your quality and profile needs.",
        img: "/images/beans.jpg",
    },
    {
        num: "03",
        title: "Import & Logistics Support",
        text: "Guidance with documentation, shipping, and international trade compliance to ensure smooth delivery.",
        img: "/images/logistics.jpg",
    },
    {
        num: "04",
        title: "Customizable Export Options",
        text: "From small specialty shipments to full container loads, tailored to your business requirements.",
        img: "/images/export.jpg",
    },
];

const page = () => {

    return (
        <main className="min-h-screen bg-white ">
            <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12">

                {/* Heading */}
                <header className="text-center mb-16">
                    <p className="font-ppitalic text-lg text-coffeeGreen">
                        From Bean to Bag
                    </p>
                    <h1 className="font-suisse text-4xl md:text-5xl text-coffeeGreen mt-2 leading-tight">
                        A Journey of <br className="hidden md:block" />
                        Unwavering Quality
                    </h1>
                    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                        Every coffee bean has a story. Ours is one of meticulous care, expert
                        craftsmanship, and a commitment to excellence at every single stage.
                    </p>
                </header>

                {/* Steps */}
                <section className="grid md:grid-cols-2 gap-12">
                    {steps.map((s) => (
                        <div key={s.num} className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <span className="font-ppitalic text-3xl text-coffeeGreen">
                                    {s.num}
                                </span>
                                <h2 className="font-suisse text-xl text-coffeeGreen">
                                    {s.title}
                                </h2>
                            </div>
                            <p className="text-gray-700">{s.text}</p>
                            <div className="relative w-full h-52 md:h-56 lg:h-64">
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    )
}

export default page