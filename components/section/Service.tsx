"use client"
import React, { useRef } from 'react'
import ServiceCard from '../ui/ServiceCard/ServiceCard';
import { useScroll } from 'framer-motion';

const services = [
    {
        title: "Raw Bean Selection",
        copy: "Curated sourcing of Ethiopia's finest origins — Yirgacheffe, Sidamo, Guji, and more — graded and quality-controlled for export.",
        img: "/images/service/s1.jpeg",
    },
    {
        title: "Private Label Blends",
        copy: "Custom coffee blends and packaging tailored to your brand, helping you stand out in retail and wholesale markets.",
        img: "/images/service/s2.jpeg",
    },
    {
        title: "Sustainability in Raw Coffee",
        copy: "Direct trade, traceability, and eco-friendly practices that support farmers and ensure long-term sustainable supply.",
        img: "/images/service/s3.jpeg",
    },
    {
        title: "Coffee Roasting",
        copy: "Sample roasting, profile development, and flavor testing to guarantee consistent quality for buyers and partners.",
        img: "/images/service/s4.jpeg",
    },
    {
        title: "Coffee Import Consultancy",
        copy: "Advisory support for global buyers — from logistics and compliance to quality evaluation and contract management.",
        img: "/images/service/s5.jpeg",
    },
    {
        title: "Brand Design",
        copy: "Complete identity development for coffee businesses, including packaging, logo, and promotional materials.",
        img: "/images/service/s6.jpeg",
    },
    {
        title: "Sales & Marketing Support",
        copy: "Go-to-market strategies, social content, and promotional campaigns that connect your coffee brand with the right audience.",
        img: "/images/service/s7.jpeg",
    },
];

const Service = () => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    
    return (
        <div ref={container} className={"bg-secondary relative z-30"}>
            {
                services.map((service, i) => {
                    const targetScale = 1 - ((services.length - i) * 0.05);
                    const rangeStart = i / services.length;
                    return <ServiceCard key={`p_${i}`} i={i} {...service} progress={scrollYProgress} range={[rangeStart, 1]} targetScale={targetScale} />
                })
            }
        </div>
    )
}

export default Service
