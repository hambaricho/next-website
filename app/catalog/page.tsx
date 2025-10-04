import type { Metadata } from "next"
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
    title: "Ethiopian Coffee Catalog | Premium Green Beans | Hambaricho Coffee",
    description:
        "Browse our complete catalog of Ethiopian green coffee beans - Yirgacheffe, Sidamo, Guji, Harar, Limu & more. Grade 1-5 available with detailed origin profiles, cupping notes, and export specifications.",
    keywords: [
        "Ethiopian coffee catalog",
        "Yirgacheffe green beans",
        "Sidamo coffee export",
        "Guji specialty coffee",
        "Harar coffee beans",
        "Limu coffee Ethiopia",
        "Jimma coffee export",
        "Nekemte coffee beans",
        "Ethiopian coffee grades",
        "green coffee catalog",
        "specialty coffee Ethiopia",
    ],
    alternates: {
        canonical: "https://hambarichocoffee.com/catalog",
    },
    openGraph: {
        type: "website",
        url: "https://hambarichocoffee.com/catalog",
        title: "Ethiopian Coffee Catalog | Premium Green Beans | Hambaricho Coffee",
        description:
            "Explore our full range of Ethiopian green coffee beans from all major growing regions. Grade 1-5, washed & natural processing, with complete traceability.",
        siteName: "Hambaricho Coffee",
        images: [
            {
                url: "https://hambarichocoffee.com/images/og.png",
                width: 1200,
                height: 630,
                alt: "Hambaricho Coffee - Ethiopian Green Coffee Catalog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@HambarichoCoffee",
        title: "Ethiopian Coffee Catalog | Premium Green Beans",
        description:
            "Browse Yirgacheffe, Sidamo, Guji, Harar & more Ethiopian coffees with detailed profiles and export specs.",
        images: ["https://hambarichocoffee.com/images/og.png"],
    },
};

export default function CatalogPage() {
    return <CatalogClient />
}
