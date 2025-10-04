import { motion } from "framer-motion";
import Image from "next/image";

function MarqueeItem({ images, from, to }: {
    images: string[],
    from: number | string, to: number | string
}) {
    return (
        <div className="flex my-24">
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0"
            >
                {images.map((image: string, index: number) => {
                    return <Image
                        width={250}
                        height={250}
                        alt={`marqueImg${index}`}
                        className="object-contain pr-20"
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
                        width={250}
                        height={250}
                        alt={`marqueImg${index}`}
                        className="object-contain pr-20"
                        src={image}
                        key={index} />;

                })}
            </motion.div>
        </div>
    );
};

export default function Marquee() {

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
        <div className="container mx-auto overflow-hidden select-none absolute -bottom-16 md:bottom-0 left-0 z-30">
            <MarqueeItem images={images} from={0} to={"-100%"} />
        </div>
    );
};