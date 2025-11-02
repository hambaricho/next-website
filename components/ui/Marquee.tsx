"use client"
import { motion } from "framer-motion";
import Image from "next/image";

function MarqueeItem({ images, from, to }: {
    images: string[],
    from: number | string, to: number | string
}) {
    return (
        <div className="flex">
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0"
            >
                {images.map((image: string, index: number) => {
                    return <Image
                        width={350}
                        height={250}
                        alt={`marqueImg${index}`}
                        className="object-contain w-64 lg:w-96 pr-32"
                        src={image}
                        key={index} />

                })}
            </motion.div>

            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0"
            >
                {images.map((image: string, index: number) => {
                    return <Image
                        width={350}
                        height={250}
                        alt={`marqueImg${index}`}
                        className="object-contain w-64 lg:w-96 pr-32"
                        src={image}
                        key={index} />;

                })}
            </motion.div>
        </div>
    );
};

export default function Marquee({ className }: { className: string }) {

    const images = [
        "/images/logoWithText.webp",
        "/images/logoWithText.webp",
        "/images/logoWithText.webp",
        '/images/logoWithText.webp',
        "/images/logoWithText.webp",
        "/images/logoWithText.webp",
        '/images/logoWithText.webp'
    ];

    return (
        <div className={`mx-auto overflow-hidden select-none ${className}`}>
            <MarqueeItem images={images} from={0} to={"-100%"} />
        </div>
    );
};