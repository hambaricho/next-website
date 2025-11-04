"use client";
import Copy from "@/components/ui/Copy/Copy";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUp } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "./Footer.css";

gsap.registerPlugin(useGSAP);

const createIconSVG = (iconPath: string, color: string = "#ffffff") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const socials = [
  {
    icon: createIconSVG('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'),
    url: "https://instagram.com",
    label: "Instagram"
  },
  {
    icon: createIconSVG('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'),
    url: "https://linkedin.com",
    label: "LinkedIn"
  },
  {
    icon: createIconSVG('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
    url: "https://youtube.com",
    label: "YouTube"
  },
  {
    icon: createIconSVG('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    url: "https://facebook.com",
    label: "Facebook"
  },
  {
    icon: createIconSVG('<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8.5V15a3.5 3.5 0 1 1-3.5-3.5"/><path d="M16 8.5c-1.38 0-2.5-1.12-2.5-2.5V4"/>'),
    url: "https://tiktok.com",
    label: "TikTok"
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const explosionContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false)


  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 300,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
    resetDelay: 500,
  };

  const imageParticleCount = 20;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    () => `/images/greenBean.svg`
  );

  class Particle {
    element: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;

    constructor(element: HTMLImageElement) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
  }

  useGSAP(
    () => {
      let hasExploded = false;
      let animationId: number;
      let checkTimeout: number;

      imagePaths.forEach((path) => {
        const img = new window.Image();
        img.src = path;
      });

      const getComputedImageSize = () => {
        const viewportWidth =
          typeof window !== "undefined" ? window.innerWidth : 1200;
        const viewportHeight =
          typeof window !== "undefined" ? window.innerHeight : 800;
        const baseOnWidth = Math.floor(viewportWidth * 0.18);
        const baseOnHeight = Math.floor(viewportHeight * 0.22);
        return Math.max(
          300,
          Math.min(config.imageSize, baseOnWidth, baseOnHeight)
        );
      };

      const createParticles = () => {
        if (!explosionContainerRef.current) return;
        explosionContainerRef.current.innerHTML = "";

        const particleSize = getComputedImageSize();
        explosionContainerRef.current.style.setProperty(
          "--particle-size",
          `${particleSize}px`
        );

        imagePaths.forEach((path) => {
          const particle = document.createElement("img");
          particle.src = path;
          particle.classList.add("explosion-particle-img");
          explosionContainerRef.current!.appendChild(particle);
        });
      };

      const explode = () => {
        if (hasExploded || !explosionContainerRef.current) return;

        hasExploded = true;
        createParticles();

        const particleElements = explosionContainerRef.current.querySelectorAll(
          ".explosion-particle-img"
        );
        const particles = Array.from(particleElements).map(
          (element) => new Particle(element as HTMLImageElement)
        );

        const animate = () => {
          particles.forEach((particle) => particle.update());
          animationId = requestAnimationFrame(animate);

          const container = explosionContainerRef.current;
          if (
            container &&
            particles.every(
              (particle) =>
                particle.y > container.offsetHeight / 2
            )
          ) {
            cancelAnimationFrame(animationId);
          }
        };

        animate();
      };

      const checkFooterPosition = () => {
        if (!footerRef.current) return;

        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (footerRect.top > viewportHeight + 100) {
          hasExploded = false;
        }

        if (!hasExploded && footerRect.top <= viewportHeight + 250) {
          explode();
        }
      };

      createParticles();
      setTimeout(checkFooterPosition, 500);

      const scrollHandler = () => {
        clearTimeout(checkTimeout);
        checkTimeout = setTimeout(checkFooterPosition, 5) as unknown as number;
      };

      const resizeHandler = () => {
        const newSize = getComputedImageSize();
        if (explosionContainerRef.current) {
          explosionContainerRef.current.style.setProperty(
            "--particle-size",
            `${newSize}px`
          );
        }
        hasExploded = false;
      };

      window.addEventListener("scroll", scrollHandler);
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", resizeHandler);
        clearTimeout(checkTimeout);
        cancelAnimationFrame(animationId);
        if (explosionContainerRef.current) {
          explosionContainerRef.current.innerHTML = "";
        }
      };
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-secondary relative">

      <Link href="/"
        className='absolute top-16 md:top-10 left-4 md:left-10 z-30'>
        <Image
          src="/images/footerLogo.svg"
          alt="Hambaricho logo"
          width={60}
          height={60}
        />
      </Link>

      <motion.div
        className={`absolute hidden lg:flex items-center gap-2 right-10 top-16 z-30 cursor-pointer text-white font-[SuisseIntl-Regular] text-sm md:text-base p-2 rounded-full border-[1px] border-white`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp />
        Scroll To Top
      </motion.div>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed Button
          <motion.button
            key="button"
            onClick={() => setIsExpanded(true)}
            className="text-center flex lg:hidden absolute right-4 lg:right-10 top-16 md:top-10 z-30 px-4 py-2 text-white font-[SuisseIntl-Regular] rounded-full border-[1px] border-white cursor-pointer"
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
            className="bg-secondary z-50 border border-white/20 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl p-6 w-11/12 md:min-w-[400px] shadow-2xl"
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
      <div className="container">
        <div className="footer-header-content">
          <div className="footer-header">
            <Copy animateOnScroll={true} delay={0.2}>
              <h1 className="font-[SuisseIntl-Bold] text-white text-4xl lg:text-8xl uppercase max-w-4xl font-extrabold">Let&apos;s keep the coffee brewing together</h1>
            </Copy>
          </div>

          <div className="footer-link items-center gap-4 hidden lg:flex">
            {socials.map((social) => (
              <div key={social.label}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <Image src={social.icon} alt={social.label} width={30} height={30} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between absolute left-0 bottom-0 w-full p-4">
          <div className="hidden lg:block">
            <p className="hidden lg:block">
              Premium Ethiopian Coffee
            </p>
          </div>

          <div className="footer-author">
            <p>Powered By Gezat Communications</p>
          </div>

          <div className="footer-copyright">
            <p>&copy; Hambaricho Coffee</p>
          </div>
        </div>
      </div>
      <div className="explosion-container" ref={explosionContainerRef}></div>
    </footer>
  );
};

export default Footer;
