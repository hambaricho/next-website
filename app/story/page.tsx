
import { Metadata } from 'next';
import StoryClient from './StoryClient';

export const metadata: Metadata = {
    title: "The Land of Coffee | Hambaricho Coffee Ethiopia",
    description:
        "Discover Ethiopia’s finest green coffee exports. Authentic sourcing, radical transparency, and on-time delivery directly from trusted Ethiopian producers.",
    keywords: [
        "Ethiopian coffee",
        "green coffee export",
        "single origin coffee",
        "Hambaricho Coffee",
        "coffee sourcing Ethiopia",
    ],
    openGraph: {
        title: "The Land of Coffee | Hambaricho Coffee",
        description:
            "Authentic Ethiopian coffee, radical transparency, and on-time delivery from the birthplace of coffee.",
        url: "https://hambarichocoffee.com/story",
        siteName: "Hambaricho Coffee",
        images: [
            {
                url: "https://hambarichocoffee.com/images/og.png",
                width: 1200,
                height: 630,
                alt: "Beautiful Ethiopian coffee landscape",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@HambarichoCoffee",
        title: "The Land of Coffee | Hambaricho Coffee",
        description:
            "Discover Ethiopia's finest green coffee exports. Authentic sourcing and radical transparency.",
        images: ["https://hambarichocoffee.com/images/og.png"],
    },
};

const page = () => {
    return (
        <StoryClient />
    )
}

export default page