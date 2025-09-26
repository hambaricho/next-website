import Image from 'next/image'
import React from 'react'

const Images = () => {
    return (
        <div className='flex flex-col items-center bg-secondary justify-center gap-16'>
            <div className='w-4/5 h-[500px] relative'>
                <Image
                    src={"/images/natural.webp"}
                    alt="logo hambaricho"
                    width={150}
                    height={100}
                    className='absolute -bottom-8 right-12 hidden md:block'
                />
                <Image
                    src={"/images/gallery.jpg"}
                    alt="gallery image hambaricho"
                    width={400}
                    height={400}
                    className='w-full h-full lg:inverted-radius-bottom-right object-cover rounded-[4rem]'

                />
            </div>
            <div className='w-4/5 h-[500px] relative'>
                <Image
                    src={"/images/logoWithText.webp"}
                    alt="logo hambaricho"
                    width={200}
                    height={100}
                    className='absolute top-14 left-4 hidden md:block'
                />

                <Image
                    src={"/images/gallery.jpg"}
                    alt="Ethiopian coffee beans"
                    width={400}
                    height={400}
                    className='w-full h-full lg:inverted-radius-top-left object-cover rounded-[4rem]'
                />
            </div>
        </div>
    )
}

export default Images