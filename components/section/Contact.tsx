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
            <div className='absolute right-10 top-16 md:top-10 z-10 max-w-4xl'>
                <p className="text-xl text-center w-max   px-4 text-white font-[SuisseIntl-Regular] mb-4 rounded-full border-[1px] border-white">
                    Contact Us
                </p>
                <ul className='block lg:hidden'>
                    <li className='text-white text-lg md:text-2xl font-[SuisseIntl-Light] mb-2 flex flex-col justify-end items-end'>
                        <a href="https://www.facebook.com/hambaricho" target="_blank" rel="noopener noreferrer" className='underline ml-2'>Facebook</a>
                        <a href="https://www.instagram.com/hambaricho" target="_blank" rel="noopener noreferrer" className='underline ml-2'>Instagram</a>
                        <a href="https://www.linkedin.com/company/hambaricho" target="_blank" rel="noopener noreferrer" className='underline ml-2'>LinkedIn</a>
                        <a href="https://twitter.com/hambaricho" target="_blank" rel="noopener noreferrer" className='underline ml-2'>Twitter</a>
                        <a href="https://www.tiktok.com/@hambaricho" target="_blank" rel="noopener noreferrer" className='underline ml-2'>TikTok</a>
                    </li>
                </ul>

            </div>
            <ContactPhysicsFooter />
        </div>
    )
}

export default Contact