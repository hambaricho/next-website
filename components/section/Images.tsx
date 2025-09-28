import Image from 'next/image'
import { MaskText } from '../ui/MaskTextAnimation'


const Images = () => {

    return (
        <div className='detailSection flex flex-col items-center bg-secondary justify-center gap-4 md:gap-16'>
            <div className='w-full lg:w-4/5 h-[500px] relative'>

                <div className='hidden lg:block absolute z-20 inverted-radius-bottom-right  top-0 left-0 w-full h-full bg-black/40 overflow-hidden'>
                </div>

                <Image
                    src={"/images/natural.webp"}
                    alt="logo hambaricho"
                    width={150}
                    height={100}
                    className='absolute z-10 -bottom-8 right-12 hidden md:block'
                />

                <Image
                    src={"/images/detail1.jpg"}
                    alt="gallery image hambaricho"
                    width={800}
                    height={400}
                    className='hidden lg:block detail1 relative z-10 w-full h-full inverted-radius-bottom-right object-cover rounded-[4rem]'

                />

                <Image
                    src={"/images/detail1.jpg"}
                    alt="gallery image hambaricho"
                    width={400}
                    height={400}
                    className='block lg:hidden w-full h-3/4 mb-4 lg:h-full object-cover rounded-[4rem]'

                />
                <MaskText
                    text='From farm to cup, Hambaricho Coffee brings you premium, sustainably grown beans, handpicked with care and rooted in tradition.'
                    className='lg:absolute z-20 bottom-8 left-8 text-white md:text-2xl font-bold font-[SuisseIntl-Regular] max-w-sm md:max-w-xl pl-4'
                />
            </div>
            <div className='lg:w-4/5 h-[500px] relative'>

                <Image
                    src={"/images/logoWithText.webp"}
                    alt="logo hambaricho"
                    width={200}
                    height={100}
                    className='absolute top-14 left-4 hidden md:block'
                />

                <Image
                    src={"/images/detail2.jpg"}
                    alt="Ethiopian coffee beans hambaricho"
                    width={800}
                    height={400}
                    className='hidden lg:block detail2 relative z-10 w-full h-full inverted-radius-top-left object-cover rounded-[4rem]'
                />

                <Image
                    src={"/images/detail2.jpg"}
                    alt="Ethiopian coffee beans hambaricho"
                    width={400}
                    height={400}
                    className='block lg:hidden w-full h-3/4 mb-4 object-cover rounded-[4rem]'
                />
                <MaskText
                    text='Explore our selection of green beans, roasted coffee, and premium blends — crafted for quality, freshness, and flavor.'
                    className='lg:absolute z-20 bottom-8 right-8 text-white lg:text-right md:text-2xl font-bold font-[SuisseIntl-Regular] max-w-sm md:max-w-xl pl-4'
                />
            </div>
        </div>
    )
}

export default Images