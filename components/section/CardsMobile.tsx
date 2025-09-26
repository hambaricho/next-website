import Image from 'next/image';
import React from 'react'

const coffees = [
    {
        img: "/images/card.webp",
        name: "Yirgacheffe",
        origin: "Yirgacheffe Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2",
        grade2: "Natural - Grade 1, 2, 3",
        flavor: "Floral, citrus, tea-like",
        altitude: "1,700–2,200m",
        processing: "Washed, some natural",
    },
    {
        img: "/images/card.webp",
        name: "Sidamo",
        origin: "Sidamo Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2 ",
        grade2: "Natural - Grade 2, 3, 4",
        flavor: "Fruity, balanced, chocolate hints",
        altitude: "1,500–2,200m",
        processing: "Washed & natural",
    },
    {
        img: "/images/card.webp",
        name: "Limu",
        origin: "Limu Zone, Ethiopia",
        grade1: "Washed - Grade 1, 2 ",
        grade2: "Natural - Grade 3, 4",
        flavor: "Spicy, winey, soft acidity",
        altitude: "1,100–1,900m",
        processing: "Primarily washed",
    },
    {
        img: "/images/card.webp",
        name: "Guji",
        origin: "Guji Zone, Ethiopia",
        grade1: "Washed - Grade 1 and 2",
        grade2: "Natural - Grade 2, 3, 4, UG",
        flavor: "Fruity, floral, berry notes",
        altitude: "1,500–2,350m",
        processing: "Washed & natural",
    },
    {
        img: "/images/card.webp",
        name: "Jimma",
        origin: "Jimma Zone, Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 3",
        flavor: "Earthy, full-bodied, mild fruit",
        altitude: "1,400–2,100m",
        processing: "Mostly natural, some washed",
    },
    {
        img: "/images/card.webp",
        name: "Nekemte",
        origin: "Nekemte (East Wollega), Ethiopia",
        grade1: "Natural - Grade 4, 5",
        grade2: "Washed - Grade 2, 3",
        flavor: "Sweet, fruity, winey with spice",
        altitude: "1,700–2,200m",
        processing: "Predominantly natural",
    },
    {
        img: "/images/card.webp",
        name: "Harar",
        origin: "Eastern Highlands, Ethiopia",
        grade1: "Natural - Grade 4, 5, Mocha Harrar",
        flavor: "Bold, winey, chocolatey",
        altitude: "1,400–2,000m",
        processing: "Sun-dried (natural)",
    },
];

const CardsMobile = () => {
    return (
        <div className='grid grid-cols-2 gap-4 py-8 lg:hidden w-full'>
            {coffees.map((coffee, index) => (
                <div key={index}>
                    <Image
                        src={coffee.img}
                        alt={coffee.name}
                        width={700}
                        height={480}
                        className='w-full object-cover' />

                </div>
            ))}
        </div>
    )
}

export default CardsMobile