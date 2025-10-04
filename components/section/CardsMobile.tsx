import Card from '../ui/Card';

const coffeeData = [
    {
        img: "/images/coffee/1.jpg",
        name: "Sidamo",
        cardInfo1: "Bright & Floral",
        cardInfo2: "High-Altitude Growth",
        cardInfo3: "Balanced Cup",
    },
    {
        img: "/images/coffee/2.jpg",
        name: "Yirgacheffe",
        cardInfo1: "Delicate & Elegant",
        cardInfo2: "Washed Process",
        cardInfo3: "World Renowned",
    },
    {
        img: "/images/coffee/3.jpg",
        name: "Limu",
        cardInfo1: "Mild & Aromatic",
        cardInfo2: "Citrus & Floral Notes",
        cardInfo3: "Southern Ethiopia Origin",

    },
    {
        img: "/images/coffee/4.jpg",
        name: "Guji",
        cardInfo1: "Fruity & Complex",
        cardInfo2: "Specialty Grade",
        cardInfo3: "Vibrant Character",
    },
    {
        img: "/images/coffee/5.jpg",
        name: "Jimma",
        cardInfo1: "Nutty & Chocolatey",
        cardInfo2: "Rustic Profile",
        cardInfo3: "Western Highlands Origin",
    },
    {
        img: "/images/coffee/6.jpg",
        name: "Nekemte",
        cardInfo1: "Sweet & Fruity",
        cardInfo2: "Balanced & Approachable",
        cardInfo3: "Western Ethiopia Grown",
    },
    {
        img: "/images/coffee/7.jpg",
        name: "Harrar",
        cardInfo1: "Bold & Full-Bodied",
        cardInfo2: "Wild Berry & Chocolate Notes",
        cardInfo3: "Traditional Dry-Processed",
    },
];

const CardsMobile = () => {
    return (
        <div className='grid grid-cols-1 gap-4 py-8 place-content-center place-items-center lg:hidden w-full'>
            {coffeeData.map((coffee, index) => (

                <Card
                    key={index}
                    image={coffee.img}
                    title={coffee.name}
                    cardInfo1={coffee.cardInfo1}
                    cardInfo2={coffee.cardInfo2}
                    cardInfo3={coffee.cardInfo3}
                />
            ))}
        </div>
    )
}

export default CardsMobile