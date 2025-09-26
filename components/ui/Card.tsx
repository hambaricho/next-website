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
        <div className={`w-80 h-[65dvh] shadow-lg flex flex-col circle-cut ${className}`} onClick={onClick}>
            <Image
                src={image}
                alt='Card Image hambaricho'
                width={300}
                height={480}
                className='h-[50%] w-full object-cover rounded-t-lg'
            />
            <div className='flex-1 p-4 bg-white rounded-b-lg'>
                <p className='text-2xl text-center text-secondary uppercase font-[PPEditorialNew-Ultrabold]'>{title}</p>
                <ul className='text-secondary font-[SuisseIntl-Light] bullet-list'>
                    <li><span className='font-[SuisseIntl-Regular] font-semibold'>Origin:</span> {origin}</li>
                    <li ><span className='font-[SuisseIntl-Regular] font-semibold'>Grades</span> <br />
                        <span className='inline-block'>
                            {grade1}
                        </span> <br />
                        {grade2 &&
                            <span className='inline-block'>
                                {grade2}
                            </span>
                        }
                    </li>
                    <li><span className='font-[SuisseIntl-Regular] font-semibold'>Flavor:</span> {flavor}</li>
                    <li><span className='font-[SuisseIntl-Regular] font-semibold'>Altitude:</span> {altitude}</li>
                    <li><span className='font-[SuisseIntl-Regular] font-semibold'>Processing:</span> {processing}</li>
                </ul>
            </div>
        </div>
    )
}

export default Card