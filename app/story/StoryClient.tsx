"use client"
import React from 'react'
import Image from "next/image";
import { AnimatedHeader } from '@/components/ui/AnimatedHeader';
import Button from '@/components/ui/Button';

const StoryClient = () => {
    return (
        <main className="w-full min-h-screen bg-gray-100 dark:bg-secondary pt-14 md:pt-28">
            <div className="flex flex-col items-center px-4 py-12 md:px-8 lg:px-16 max-w-7xl mx-auto">

                <section className="text-center mb-16">
                    <AnimatedHeader as='h1' text='THE LAND OF' className='font-[SuisseIntl-Bold] text-5xl md:text-8xl text-greenSecondary dark:text-white' />
                    <AnimatedHeader as='h1' text='COFFEE' className='font-[PPEditorialNew-Italic] text-5xl md:text-8xl text-greenSecondary' />
                </section>

                {/* Our Story */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
                    <div className="relative w-full h-64 md:h-80">
                        <Image
                            src="/images/gallery.jpg"
                            alt="Coffee landscape"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-[SuisseIntl-Bold] text-4xl md:text-5xl text-greenSecondary dark:text-white mb-2">
                            OUR STORY
                        </h3>
                        <div className="h-[1.5px] bg-greenSecondary w-full mb-4"></div>
                        <p className="text-greenSecondary dark:text-white font-[SuisseIntl-Light] leading-relaxed">
                            Coffee is not just a crop in Ethiopia, it is a way of life. At{" "}
                            Hambaricho Coffee, our roots
                            lie deep in the birthplace of coffee. For generations, Ethiopian
                            farmers have handpicked beans under the shade of indigenous trees,
                            and we are proud to carry that heritage forward.
                        </p>
                        <p className="text-greenSecondary dark:text-white font-[SuisseIntl-Light] leading-relaxed mt-4">
                            Our role is simple but meaningful: to connect these farming
                            communities with the world’s roasters and distributors. By focusing
                            solely on green coffee exports, we ensure that every bag we deliver
                            preserves the authenticity, freshness, and diversity of Ethiopia’s
                            coffee landscapes.
                        </p>
                    </div>
                </section>

                {/* Our Promise */}
                <section className="w-full">
                    <div className='max-w-lg mx-auto'>
                        <h3 className="font-[SuisseIntl-Bold] text-4xl md:text-5xl text-greenSecondary dark:text-white text-center mb-2">
                            OUR PROMISE
                            <div className="h-[1.5px] bg-greenSecondary w-[70%] mx-auto mb-4"></div>
                        </h3>
                        <p className="text-center text-greenSecondary dark:text-white tracking-widest font-[SuisseIntl-Light] mb-12">
                            Trust, Consistency, and a partnership rooted in authenticity.
                        </p>
                    </div>

                    <div className="space-y-10 max-w-2xl mx-auto">
                        {[
                            {
                                number: "01",
                                title: "Authenticity at Source",
                                text: "Direct partnerships with Ethiopia’s most trusted producers ensure unparalleled quality and genuine origin stories.",
                            },
                            {
                                number: "02",
                                title: "Radical Transparency",
                                text: "Direct partnerships with Ethiopia’s most trusted producers ensure unparalleled quality and genuine origin stories.",
                            },
                            {
                                number: "03",
                                title: "Commercial Expertise",
                                text: "From micro-lots to full containers, we serve buyers of all scales. We source exceptional micro-lots that showcase rare flavor profiles and the unique terroir of a single farm.",
                            },
                            {
                                number: "04",
                                title: "On-Time Delivery",
                                text: "We take on the operational burden so you can have complete peace of mind knowing your coffee is delivered smoothly and on schedule.",
                            },
                        ].map((item) => (
                            <div
                                key={item.number}
                                className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8"
                            >
                                <span className="font-[PPEditorialNew-Italic] text-greenSecondary/50 text-6xl text-coffeeGreen shrink-0">
                                    {item.number}
                                </span>
                                <div>
                                    <h4 className="font-[SuisseIntl-Bold] text-3xl md:text-5xl text-greenSecondary dark:text-white">
                                        {item.title}
                                        <div className="h-[1.5px] bg-greenSecondary w-11/12 mb-4"></div>
                                    </h4>
                                    <p className="text-greenSecondary dark:text-white font-[SuisseIntl-Light]">{item.text}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </section>
            </div>
            <div className='md:h-[100dvh] w-full flex flex-col justify-center items-center gap-6 md:gap-12 bg-greenSecondary py-12'>
                <p className='text-white font-[PPEditorialNew-Italic] max-w-5xl text-4xl px-2 md:text-8xl text-center mx-auto'>
                    &quot; We don&lsquo;t just sell coffee. We share a piece of our soul, history, and our home with the world &quot;
                </p>
                <div className='space-y-2 flex flex-col items-center text-white'>
                    <span className='text-lg font-[PPEditorialNew-Italic]'>Muhammed ERGÜVENOĞLU</span>
                    <span className='text-lg font-[SuisseIntl-Bold]'>Founder of Hambaricho Coffee</span>
                </div>
            </div>

            <div className='md:h-[70dvh] w-full flex flex-col justify-center items-center gap-6 md:gap-12 bg-gray-100 dark:bg-secondary py-12'>
                <p className='text-greenSecondary font-[SuisseIntl-Bold] max-w-4xl text-5xl md:text-8xl text-center mx-auto'>
                    Ready to Partner with Purpose?
                </p>
                <Button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    text='Contact Us'
                    className='bg-greenSecondary text-white mx-auto'
                />
            </div>
        </main>
    )
}

export default StoryClient