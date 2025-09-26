"use client"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';


interface SplitTextInstance {
  lines: Element[];
  revert: () => void;
}

const servicesCopy = [
  [
    "Curated sourcing of Ethiopia’s finest origins — Yirgacheffe, Sidamo, Guji, and more — graded and quality-controlled for export.",
  ],
  [
    "Custom coffee blends and packaging tailored to your brand, helping you stand out in retail and wholesale markets.",
  ],
  [
    "Direct trade, traceability, and eco-friendly practices that support farmers and ensure long-term sustainable supply.",
  ],
  [
    "Sample roasting, profile development, and flavor testing to guarantee consistent quality for buyers and partners.",
  ],
  [
    "Advisory support for global buyers — from logistics and compliance to quality evaluation and contract management.",
  ],
  [
    "Complete identity development for coffee businesses, including packaging, logo, and promotional materials.",
  ],
  [
    "Go-to-market strategies, social content, and promotional campaigns that connect your coffee brand with the right audience.",
  ],

];

const services = [
  "Raw Bean Selection",
  "Private Label Blends",
  "Sustainability in Raw Coffee",
  "Coffee Roasting",
  "Coffee Import Consultancy",
  "Brand Design",
  "Sales & Marketing Support",
];

interface CrftdComponentProps {
  className?: string;
}

const CrftdComponent: React.FC<CrftdComponentProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const serviceImgRef = useRef<HTMLDivElement>(null);
  const serviceCopyRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentCountRef = useRef<HTMLSpanElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const splitTextRef = useRef<SplitTextInstance | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [serviceWidths, setServiceWidths] = useState<number[]>([]);

  const measureServiceWidths = useCallback(() => {
    const measureContainer = document.createElement("div");
    measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      white-space: nowrap;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
    `;
    document.body.appendChild(measureContainer);

    const widths = services.map((service) => {
      measureContainer.textContent = service;
      return measureContainer.offsetWidth + 8;
    });

    document.body.removeChild(measureContainer);
    setServiceWidths(widths);
    return widths;
  }, []);

  const animateTextChange = useCallback((index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!splitTextRef.current || !serviceCopyRef.current) {
        resolve();
        return;
      }

      gsap.to(splitTextRef.current.lines, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.025,
        ease: "power3.inOut",
        onComplete: () => {
          if (splitTextRef.current) {
            splitTextRef.current.revert();
          }

          if (serviceCopyRef.current) {
            serviceCopyRef.current.textContent = servicesCopy[index][0];
            splitTextRef.current = new SplitText(serviceCopyRef.current, {
              type: "lines",
            });

            gsap.set(splitTextRef.current.lines, {
              opacity: 0,
              y: 20,
            });

            gsap.to(splitTextRef.current.lines, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              stagger: 0.025,
              ease: "power3.out",
              onComplete: resolve,
            });
          }
        },
      });
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize service copy text
    if (serviceCopyRef.current) {
      serviceCopyRef.current.textContent = servicesCopy[0][0];
      splitTextRef.current = new SplitText(serviceCopyRef.current, { type: "lines" });
    }

    // Measure service widths and setup indicator
    const widths = measureServiceWidths();

    if (indicatorRef.current && widths.length > 0) {
      gsap.set(indicatorRef.current, {
        width: widths[0],
        xPercent: -50,
        left: "50%",
      });
    }

    // Setup scroll trigger animation
    const stickyHeight = window.innerHeight * 8;

    const serviceHeight = 38;
    const imgHeight = 250;
    let localCurrentIndex = 0;

    if (stickyRef.current) {
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: `${stickyHeight}px`,
        pin: true,
        onUpdate: async (self) => {
          const progress = self.progress;
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleY: progress });
          }

          // Calculate active index based on scroll progress
          const activeIndex = Math.min(
            Math.floor(progress * services.length),
            services.length - 1
          );

          if (
            activeIndex >= 0 &&
            activeIndex < services.length &&
            localCurrentIndex !== activeIndex
          ) {
            localCurrentIndex = activeIndex;
            setCurrentIndex(activeIndex);

            // Update active service class
            serviceRefs.current.forEach((serviceEl, index) => {
              if (serviceEl) {
                serviceEl.classList.toggle('active', index === activeIndex);
              }
            });

            // Animate indicator, image, counter, and text
            const animations = [
              indicatorRef.current && gsap.to(indicatorRef.current, {
                y: activeIndex * serviceHeight,
                // width: widths[activeIndex],
                duration: 0.3,
                ease: "power3.inOut",
                overwrite: true,
              }),

              serviceImgRef.current && gsap.to(serviceImgRef.current, {
                y: -(activeIndex * imgHeight),
                duration: 0.3,
                ease: "power3.inOut",
                overwrite: true,
              }),

              currentCountRef.current && gsap.to(currentCountRef.current, {
                innerText: activeIndex + 1,
                snap: { innerText: 1 },
                duration: 0.3,
                ease: "power3.out",
              }),

              animateTextChange(activeIndex),
            ].filter(Boolean);

            await Promise.all(animations);
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, [animateTextChange, measureServiceWidths]);

  return (
    <div ref={containerRef} className={`${className} bg-secondary`}>

      <section ref={stickyRef} className="relative flex flex-col md:flex-row w-screen h-screen">

        <Image
          src={`/images/organic.webp`}
          alt="Coffee Background"
          width={120}
          height={120}
          className="hidden lg:flex object-cover absolute left-1/2 -translate-x-1/2 top-10 z-10"
        />
        {/* Services Column */}
        <div className="flex-1 flex flex-col justify-center md:justify-center items-center gap-8 pt-0 md:pt-0">
          <div className="relative flex flex-col items-center">
            {/* Indicator */}
            <div
              ref={indicatorRef}
              className="absolute top-0 left-20 w-[34px] h-[34px] md:h-[32px] bg-primary -z-10 transform translate-y-0"
            />

            {/* Services List */}
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  serviceRefs.current[index] = el;
                }}
                className={`w-max h-[38px] service ${index === 0 ? 'active' : ''}`}
              >
                <p className="uppercase text-white text-4xl font-[SuisseIntl-Bold] transition-colors duration-300 service-text">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 flex flex-row md:flex-col justify-center items-center gap-6 md:gap-8 px-2">
          {/* Service Images */}
          <div className="relative w-[45%] md:w-[60%] h-[250px] overflow-hidden">
            <div
              className="absolute inset-0 inverted-radius-bottom-right-small"
            >
              <div
                ref={serviceImgRef}
                className="w-full h-[1000px] transform translate-y-0 will-change-transform"
              >
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="w-full h-[250px] relative">
                    <Image
                      src={`/images/coffee/c1.jpeg`}
                      alt={`Service ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Copy */}
          <div className="w-[70%] md:w-[60%]">
            <p
              ref={serviceCopyRef}
              className="font-[SuisseIntl-Light] text-xl"
            >
              {servicesCopy[0][0]}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] md:rotate-0 w-[2.5px] h-[50%] md:h-[60%] bg-white">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full h-full bg-primary origin-top transform scale-y-0 will-change-transform"
          />
        </div>

        {/* Index Counter */}
        <div className="absolute top-[1%] md:bottom-[10%] md:top-auto left-1/2 transform -translate-x-1/2 w-[60px] px-1 py-1 flex justify-between items-center text-white">
          <span
            ref={currentCountRef}
            className="font-mono text-xl font-semibold leading-3 w-3 flex justify-center items-center"
          >
            1
          </span>
          <span className="relative -top-px w-5 h-0.5 bg-primary" />
          <span className="font-mono text-xl font-semibold leading-3 w-3 flex justify-center items-center">
            7
          </span>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .service.active .service-text {
          color: #ffffff;
        }
        
        body {
          height: 1100vh;
        }
        
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        
        .lenis.lenis-smooth iframe {
          pointer-events: none;
        }
        
        @media (max-width: 900px) {
          .service .service-text {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default CrftdComponent;