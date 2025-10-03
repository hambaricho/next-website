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

export default function CatalogClient() {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperType | null>(null)

    const activeCoffee = coffeeData[activeIndex]

    return (
        <div className="min-h-screen bg-greenSecondary dark:bg-secondary pt-28 pb-10 px-4">
            <div className="text-center mb-2">
                <p className="text-sm uppercase tracking-wider text-white/80 mb-2">Hambaricho Coffee</p>
                <h1 className="text-5xl md:text-7xl font-[SuisseIntl-Bold] text-white dark:text-primary-dark uppercase mb-4">
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
