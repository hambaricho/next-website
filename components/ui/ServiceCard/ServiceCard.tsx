'use client'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './ServiceCard.css';

interface ServiceCardProps {
    title: string,
    copy: string,
    img: string,
    i: number,
    progress: MotionValue<number>,
    range: [number, number],
    targetScale: number
}

const ServiceCard = ({ title, copy, img, i, progress, range, targetScale }: ServiceCardProps) => {
    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // On mobile, reduce the scale effect for better readability
    const mobileTargetScale = 1 - ((7 - i) * 0.02); // Smaller scale difference on mobile
    const finalTargetScale = isMobile ? mobileTargetScale : targetScale;
    
    const scale = useTransform(progress, range, [1, finalTargetScale]);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

    return (
        <div ref={container} className="cardContainer">
            <motion.div
                className="card bg-primary-dark border border-white"
                style={{ 
                    scale, 
                    top: isMobile ? `calc(-2vh + ${i * 15}px)` : `calc(-5vh + ${i * 25}px)` 
                }}
            >
                <h2 className='font-[SuisseIntl-Bold] text-white text-6xl text-center'>{title}</h2>
                <div className="body">
                    <div className="description">
                        <p className='text-white font-[SuisseIntl-Thin] text-2xl'>{copy}</p>
                    </div>

                    <div className="imageContainer">
                        <motion.div style={{ scale: imageScale }} className="inner">
                            <Image
                                fill
                                src={img}
                                alt="services image hambaricho"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ServiceCard