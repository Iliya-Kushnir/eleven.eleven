import ProductsFeed from "@/components/ProductsFeed/ProductsFeed"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "All Products Types",
    description: ""
}


export default function Products() {
    return (
 
    <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
        <ProductsFeed />
    </div>
    )
}