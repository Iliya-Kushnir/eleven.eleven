import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "New Products",
    description: ""
}

export default function NewIn() {

    return (
        <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
            <ProductsFeed isHomePage={false} showNewBadge={false} showDiscountBadge={false} showSoldOutBadge={false} filter="new" />
        </div>
    )
} 