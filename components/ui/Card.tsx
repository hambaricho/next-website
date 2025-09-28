import Image from 'next/image'
import React from 'react'

type Props = {
    image: string
    title: string
    origin: string
    grade1: string
    grade2: string
    flavor: string
    altitude: string
    processing: string
    onClick?: () => void
    className: string
}

const Card = ({ image, title, origin, grade1, grade2, flavor, altitude, processing, onClick, className }: Props) => {
    return (
        <div className={`w-[300px] h-auto flex flex-col circle-cut ${className}`} onClick={onClick}>
            <Image
                src={image}
                alt='Card Image hambaricho'
                width={300}
                height={480}
                className='h-[250px] w-full rounded-lg object-cover'
            />
            <div className='flex-1 p-4 rounded-lg  bg-white border-[1px] border-secondary'>
                <p className='text-2xl text-center text-secondary uppercase font-[PPEditorialNew-Ultrabold]'>{title}</p>
                <ul className='font-[SuisseIntl-Light] bullet-list text-gray-700'>
                    <li><span className='font-[SuisseIntl-Regular] text-black'>Origin:</span> {origin}</li>
                    <li ><span className='font-[SuisseIntl-Regular] text-black'>Grades</span> <br />
                        <span className='inline-block'>
                            {grade1}
                        </span> <br />
                        {grade2 &&
                            <span className='inline-block'>
                                {grade2}
                            </span>
                        }
                    </li>
                    <li><span className='font-[SuisseIntl-Regular] text-black'>Flavor:</span> {flavor}</li>
                    <li><span className='font-[SuisseIntl-Regular] text-black'>Altitude:</span> {altitude}</li>
                    <li><span className='font-[SuisseIntl-Regular] text-black'>Processing:</span> {processing}</li>
                </ul>
            </div>
        </div>
    )
}

export default Card