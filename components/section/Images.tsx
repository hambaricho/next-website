import Image from 'next/image'
import { MaskText } from '../ui/MaskTextAnimation'
import { AnimatedHeader } from '../ui/AnimatedHeader'


const Images = () => {

    return (
        <div className='detailSection flex flex-col items-center bg-secondary justify-center gap-4 md:gap-16 lg:py-12'>
            <AnimatedHeader as="h1"
                className="text-4xl md:text-6xl text-left w-3/4 uppercase text-white relative z-30 font-[SuisseIntl-Bold]"
                text="Gallery/Blog" />

            <div className='w-11/12 md:h-[900px] relative'>

                <Image
                    src={"/images/natural.webp"}
                    alt="logo hambaricho"
                    width={150}
                    height={100}
                    className='absolute z-10 -bottom-8 right-32 hidden md:block'
                />

                <Image
                    src={"/images/gallery1.webp"}
                    alt="gallery image hambaricho"
                    width={1200}
                    height={800}
                    className='hidden lg:block detail1 relative z-10 w-full h-full object-contain'

                />

                <Image
                    src={"/images/mgallery1.webp"}
                    alt="gallery image hambaricho"
                    width={400}
                    height={400}
                    className='block lg:hidden w-full h-3/4 mb-4 lg:h-full object-cover'
                />

                <MaskText
                    text='From farm to cup, Hambaricho Coffee brings you premium, sustainably grown beans, handpicked with care and rooted in tradition.'
                    className='lg:absolute z-20 bottom-8 left-32 text-white md:text-2xl font-bold font-[SuisseIntl-Regular] max-w-sm md:max-w-xl pl-4'
                />
            </div>
            <div className='w-11/12 md:h-[900px]  relative'>

                <Image
                    src={"/images/logoWithText.webp"}
                    alt="logo hambaricho"
                    width={200}
                    height={100}
                    className='absolute top-14 left-32 hidden md:block'
                />

                <Image
                    src={"/images/gallery2.webp"}
                    alt="gallery image hambaricho"
                    width={800}
                    height={400}
                    className='hidden lg:block detail1 relative z-10 w-full h-full object-contain'

                />

                <Image
                    src={"/images/mgallery2.webp"}
                    alt="gallery image hambaricho"
                    width={400}
                    height={400}
                    className='block lg:hidden w-full h-3/4 mb-4 lg:h-full object-cover'
                />

                <MaskText
                    text='Explore our selection of green beans, roasted coffee, and premium blends — crafted for quality, freshness, and flavor.'
                    className='lg:absolute z-20 bottom-8 right-32 text-white lg:text-right md:text-2xl font-bold font-[SuisseIntl-Regular] max-w-sm md:max-w-xl pl-4'
                />
            </div>
        </div>
    )
}

export default Images