import Link from "next/link"
import { getProductsGroupedByType } from "@/lib/shopify"
import ProductsTypesPage from "@/components/AllTypes/AllTypes"

export default async function TypesPage() {
    const grouped = await getProductsGroupedByType()
    const types = Object.keys(grouped)

    console.log("This data that I get from server:", types)

    return (
        <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
            <ProductsTypesPage />
        </div>
    )
}