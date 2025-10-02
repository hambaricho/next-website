"use client"
import Card from '@/components/ui/Card'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const coffeeData = [
    {
        img: "/images/coffee/1.jpg",
        name: "Yirgacheffe",
        origin: "Yirgacheffe Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2",
        grade2: "Natural - Grade 1, 2, 3",
        flavor: "Floral, citrus, tea-like",
        altitude: "1,700–2,200m",
        processing: "Washed, some natural",
        body: "Light to Medium",
        acidity: "Bright",
        weight: "320 bags / 19,200 kg",
        available: "Washed: Sidamo Grade 1 & 2 | Natural: Sidamo Grade 2, 3, 4, UG",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Grown in the highlands of southern Ethiopia, Sidamo coffee offers a balanced cup with notes of citrus and jasmine. Grown at high altitudes, these beans are handpicked to ensure optimal ripeness."
    },
    {
        img: "/images/coffee/2.jpg",
        name: "Sidamo",
        origin: "Sidamo Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2",
        grade2: "Natural - Grade 2, 3, 4",
        flavor: "Fruity, balanced, chocolate hints",
        altitude: "1,500–2,200m",
        processing: "Washed & natural",
        body: "Medium",
        acidity: "Moderate",
        weight: "320 bags / 19,200 kg",
        available: "Washed: Sidamo Grade 1 & 2 | Natural: Sidamo Grade 2, 3, 4, UG",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Sidamo offers a harmonious blend of fruity sweetness and balanced acidity with chocolate undertones, making it a versatile choice for all brewing methods."
    },
    {
        img: "/images/coffee/3.jpg",
        name: "Limu",
        origin: "Limu Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2",
        grade2: "Natural - Grade 3, 4",
        flavor: "Spicy, winey, soft acidity",
        altitude: "1,100–1,900m",
        processing: "Primarily washed",
        body: "Medium to Full",
        acidity: "Soft",
        weight: "20ft container: 320 bags / 19,200 kg",
        available: "Washed - Grade 1, 2 | Natural - Grade 3, 4",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Limu coffee is known for its spicy and winey characteristics with a soft acidity, perfect for those seeking a full-bodied Ethiopian coffee experience."
    },
    {
        img: "/images/coffee/4.jpg",
        name: "Guji",
        origin: "Guji Zone, Ethiopia",
        grade1: "Washed - Grade 1 and 2",
        grade2: "Natural - Grade 2, 3, 4, UG",
        flavor: "Fruity, floral, berry notes",
        altitude: "1,500–2,350m",
        processing: "Washed & natural",
        body: "Light to Medium",
        acidity: "Bright",
        weight: "20ft container: 320 bags / 19,200 kg",
        available: "Washed - Grade 1, 2 | Natural - Grade 2, 3, 4, UG",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Guji coffee showcases intense fruitiness with floral notes and distinct berry flavors, grown at high altitudes for exceptional cup quality."
    },
    {
        img: "/images/coffee/5.jpg",
        name: "Jimma",
        origin: "Jimma Zone, Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 3",
        flavor: "Earthy, full-bodied, mild fruit",
        altitude: "1,400–2,100m",
        processing: "Mostly natural, some washed",
        body: "Full",
        acidity: "Low",
        weight: "20ft container: 320 bags / 19,200 kg",
        available: "Natural - Grade 4, 5 | Washed - Grade 3",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Jimma offers an earthy, full-bodied profile with mild fruit notes, primarily processed naturally for a rich and complex cup."
    },
    {
        img: "/images/coffee/6.jpg",
        name: "Nekemte",
        origin: "Nekemte (East Wollega), Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 2, 3",
        flavor: "Sweet, fruity, winey with spice",
        altitude: "1,700–2,200m",
        processing: "Predominantly natural",
        body: "Medium to Full",
        acidity: "Moderate",
        weight: "20ft container: 320 bags / 19,200 kg",
        available: "Natural - Grade 4, 5 | Washed - Grade 2, 3",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Nekemte coffee delivers sweet and fruity notes with a winey character and spice undertones, predominantly natural processed for depth."
    },
    {
        img: "/images/coffee/7.jpg",
        name: "Harar",
        origin: "Eastern Highlands, Ethiopia",
        grade1: "Natural - Grade 4, 5, Mocha Harrar",
        grade2: "",
        flavor: "Bold, winey, chocolatey",
        altitude: "1,400–2,000m",
        processing: "Sun-dried (natural)",
        body: "Full",
        acidity: "Medium",
        weight: "20ft container: 320 bags / 19,200 kg",
        available: "Natural - Grade 4, 5, Mocha Harrar",
        packaging: "30 Kg, 60 Ka, 70 Kg Bulk Bags",
        garbling: "Clean",
        shelfLife: "6–9 months",
        description: "Known for its bright acidity and floral notes, Harar coffee offers a balanced cup with hints of citrus and jasmine. Grown at high altitudes, these beans are handpicked for optimal ripeness."
    },
];

const CatalogPage = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperType | null>(null)

    const activeCoffee = coffeeData[activeIndex]

    return (
        <div className="min-h-screen bg-greenSecondary dark:bg-secondary pt-28 pb-10 px-4">
            <div className="text-center mb-2">
                <p className="text-sm uppercase tracking-wider text-white/80 mb-2">Hambaricho Coffee</p>
                <h1 className="text-5xl md:text-7xl font-[SuisseIntl-Bold] text-white uppercase mb-4">
                    {activeCoffee.name}
                </h1>
                <p className="text-white/90 max-w-2xl mx-auto font-[SuisseIntl-Light]">
                    {activeCoffee.description}
                </p>
            </div>

            {/* Swiper Carousel */}
            <div className="max-w-7xl mx-auto mb-2 relative">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={false}
                    initialSlide={0}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: 15,    
                        depth: 100,
                        modifier: 2,
                        slideShadows: true, 
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex)
                    }}
                    className="catalog-swiper"
                >
                    {coffeeData.map((coffee, index) => (
                        <SwiperSlide key={index} className="!w-[300px] md:!w-[300px]">
                            <Card
                                key={index}
                                image={coffee.img}
                                title={coffee.name}
                                origin={coffee.origin}
                                grade1={coffee.grade1}
                                grade2={coffee.grade2!}
                                flavor={coffee.flavor}
                                altitude={coffee.altitude}
                                processing={coffee.processing}
                                className="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* Custom Navigation Arrows */}
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

   
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-white">
                <div className=" p-8">
                    <h2 className="text-2xl font-[SuisseIntl-Bold] mb-6 border-b border-white/60 pb-4">
                        Coffee Details
                    </h2>
                    <div className="space-y-4 font-[SuisseIntl-Light]">
                        <div>
                            <p className="text-white/60 text-sm">Available Grades:</p>
                            <p className="text-lg">{activeCoffee.available}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Packaging:</p>
                            <p className="text-lg">{activeCoffee.packaging}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Garbling Status:</p>
                            <p className="text-lg">{activeCoffee.garbling}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Origin:</p>
                            <p className="text-lg">{activeCoffee.origin}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Processing:</p>
                            <p className="text-lg">{activeCoffee.processing}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Shelf Life:</p>
                            <p className="text-lg">{activeCoffee.shelfLife}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Coffee Brief */}
                <div className=" p-8">
                    <h2 className="text-2xl font-[SuisseIntl-Bold] mb-6 border-b border-white/60 pb-4">
                        Coffee Brief
                    </h2>
                    <div className="space-y-6 font-[SuisseIntl-Light]">
                        <p className="text-white/90 leading-relaxed">
                            {activeCoffee.description}
                        </p>

                        {/* Attribute Bars */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Body</span>
                                    <span className="text-white/60">{activeCoffee.body}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: activeCoffee.body.includes('Full') ? '90%' : activeCoffee.body.includes('Medium') ? '60%' : '30%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Acidity</span>
                                    <span className="text-white/60">{activeCoffee.acidity}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: activeCoffee.acidity.includes('Bright') ? '85%' : activeCoffee.acidity.includes('Moderate') || activeCoffee.acidity.includes('Medium') ? '55%' : '25%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Grade</span>
                                    <span className="text-white/60">{activeCoffee.grade1.split(' - ')[1] || 'Premium'}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: activeCoffee.grade1.includes('Grade 1') ? '95%' : '70%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Weight</span>
                                    <span className="text-white/60">{activeCoffee.weight.split(':')[1]?.trim() || activeCoffee.weight}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogPage
