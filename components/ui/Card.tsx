import { Blend, Disc, Star } from 'lucide-react'
import Image from 'next/image'

type Props = {
    image: string
    title: string
    cardInfo1?: string
    cardInfo2?: string
    cardInfo3?: string
    origin?: string
    grade1?: string
    grade2?: string
    flavor?: string
    altitude?: string
    processing?: string
    onClick?: () => void
    className?: string
}

const Card = ({ image, title, cardInfo1, cardInfo2, cardInfo3, origin, flavor, altitude, processing, onClick, className }: Props) => {
    return (

        <div className={`w-[300px] h-auto flex flex-col ${className}`} onClick={onClick}>
            <Image
                src={image}
                alt='Card Image hambaricho'
                width={300}
                height={480}
                className='h-[350px] w-full rounded-t-xl rounded-b-3xl object-cover'
            />
            <div className='flex-1 p-4 rounded-b-xl rounded-t-3xl  bg-white shadow-lg lg:shadow-2xl shadow-secondary'>
                <p className='text-2xl text-center text-secondary uppercase font-[PPEditorialNew-Ultrabold]'>{title}</p>
                <ul className='mt-4'>
                    {cardInfo1 &&
                        <li className='font-[SuisseIntl-light] text-black flex gap-2 items-center '>
                            <Disc size={15} className='ml-2 text-black' />
                            {cardInfo1}
                        </li>
                    }
                    {cardInfo2 &&
                        <li className='font-[SuisseIntl-light] text-black flex gap-2 items-center '>
                            <Star size={15} className='ml-2 text-primary' />
                            {cardInfo2}
                        </li>
                    }
                    {cardInfo3 &&
                        <li className='font-[SuisseIntl-light] text-black flex gap-2 items-center '>
                            <Blend size={15} className='ml-2 text-primary' />
                            {cardInfo3}
                        </li>
                    }
                    {origin &&
                        <li className='text-gray-600'><span className='font-[SuisseIntl-Regular] text-black'>Origin:</span> {origin}</li>
                    }
                    {flavor && (
                        <li className='text-gray-600 flex items-center gap-1'><p className='font-[SuisseIntl-Regular] text-black'>Flavor:</p> {flavor}</li>
                    )}
                    {altitude && (
                        <li className='text-gray-600 flex items-center gap-1'><p className='font-[SuisseIntl-Regular] text-black'>Altitude:</p> {altitude}</li>
                    )}
                    {processing && (
                        <li className='text-gray-600 flex items-center gap-1'><p className='font-[SuisseIntl-Regular] text-black'>Processing:</p> {processing}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Card