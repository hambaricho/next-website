
import type { Metadata } from "next";
import ServiceClient from "./ServiceClient";


export const metadata: Metadata = {
    title: "From Bean to Bag | A Journey of Unwavering Quality",
    description:
        "Experience the meticulous process of Ethiopian coffee sourcing, selection, and export. Sustainable sourcing, expert logistics, and customizable export options.",
    keywords: [
        "Ethiopian coffee export",
        "raw bean selection",
        "sustainable sourcing",
        "coffee logistics",
    ],
    openGraph: {
        title: "From Bean to Bag | A Journey of Unwavering Quality",
        description:
            "Sustainable sourcing and export of premium Ethiopian coffee with complete traceability and expert logistics.",
        url: "https://hambarichocoffee.com/services",
        siteName: "Hambaricho Coffee",
        images: [
            {
                url: "https://hambarichocoffee.com/images/og.png",
                width: 1200,
                height: 630,
                alt: "Coffee beans journey from Ethiopia",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@HambarichoCoffee",
        title: "From Bean to Bag | A Journey of Unwavering Quality",
        description:
            "Sustainable sourcing and export of premium Ethiopian coffee with complete traceability.",
        images: ["https://hambarichocoffee.com/images/og.png"],
    },
};



const page = () => {

    return (
        <ServiceClient />
    )
}

export default page