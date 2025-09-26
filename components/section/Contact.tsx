import React from 'react'
import ContactPhysicsFooter from '@/components/ui/ContactPhysicsFooter'
import Image from 'next/image'
const Contact = () => {
    return (
        <div className='relative'>
            <Image
                src="/images/footerLogo.svg"
                alt="Hambaricho logo"
                width={60}
                height={60}
                className='absolute top-16 md:top-10 left-10 z-30'
            />
            <p className="text-xl text-center w-max  absolute right-10 top-16 md:top-10 z-10 max-w-4xl px-4 text-white font-[SuisseIntl-Regular] mb-4 rounded-full border-[1px] border-white">
                Contact Us
            </p>
            <ContactPhysicsFooter />
        </div>
    )
}

export default Contact