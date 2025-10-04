"use client"
import React, { useState } from 'react'
import ContactPhysicsFooter from '@/components/ui/ContactPhysicsFooter'
import Image from 'next/image'
import { Link } from 'next-transition-router'
import { motion, AnimatePresence } from 'framer-motion'

const Contact = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className='relative'>
            <Link href="/"
                className='absolute top-16 md:top-10 left-10 z-30'>
                <Image
                    src="/images/footerLogo.svg"
                    alt="Hambaricho logo"
                    width={60}
                    height={60}
                />
            </Link>

            <motion.div 
                className='absolute right-10 top-16 md:top-10 z-30'
                layout
                initial={false}
            >
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        // Collapsed Button
                        <motion.button
                            key="button"
                            onClick={() => setIsExpanded(true)}
                            className="text-xl text-center px-4 py-2 text-white font-[SuisseIntl-Regular] rounded-full border-[1px] border-white hover:bg-white/10 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            Contact Us
                        </motion.button>
                    ) : (
                        // Expanded Card
                        <motion.div
                            key="card"
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[300px] md:min-w-[400px] shadow-2xl"
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Header with Close Button */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-[SuisseIntl-Bold] text-white">Get in Touch</h3>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                    aria-label="Close contact card"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4 mb-6">
                                {/* Address */}
                                <motion.div 
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-white/60 text-sm font-[SuisseIntl-Light]">Address</p>
                                        <p className="text-white font-[SuisseIntl-Regular]">Addis Ababa, Ethiopia</p>
                                        <p className="text-white font-[SuisseIntl-Light] text-sm">Bole, Kirkos Sub-City</p>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.div 
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <p className="text-white/60 text-sm font-[SuisseIntl-Light]">Phone</p>
                                        <a href="tel:+251911234567" className="text-white font-[SuisseIntl-Regular] hover:text-primary transition-colors">
                                            +251 91 123 4567
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Email */}
                                <motion.div 
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="text-white/60 text-sm font-[SuisseIntl-Light]">Email</p>
                                        <a href="mailto:info@hambarichocoffee.com" className="text-white font-[SuisseIntl-Regular] hover:text-primary transition-colors">
                                            info@hambarichocoffee.com
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className="text-white/60 text-sm font-[SuisseIntl-Light] mb-3">Follow Us</p>
                                <div className="flex flex-wrap gap-3">
                                    <a href="https://www.facebook.com/hambaricho" target="_blank" rel="noopener noreferrer" 
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-[SuisseIntl-Regular] transition-all hover:scale-105">
                                        Facebook
                                    </a>
                                    <a href="https://www.instagram.com/hambaricho" target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-[SuisseIntl-Regular] transition-all hover:scale-105">
                                        Instagram
                                    </a>
                                    <a href="https://www.linkedin.com/company/hambaricho" target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-[SuisseIntl-Regular] transition-all hover:scale-105">
                                        LinkedIn
                                    </a>
                                    <a href="https://twitter.com/hambaricho" target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-[SuisseIntl-Regular] transition-all hover:scale-105">
                                        Twitter
                                    </a>
                                    <a href="https://www.tiktok.com/@hambaricho" target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-[SuisseIntl-Regular] transition-all hover:scale-105">
                                        TikTok
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <ContactPhysicsFooter />
        </div>
    )
}

export default Contact