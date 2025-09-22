"use client"
import SearchingFeed from "@/components/SearchingField/SearchingField"


export default function Search() {

    return(
        <div className="font-sans flex flex-col items-center justify-items-center  p-2.5 pb-2.5 pt-[75px] sm:p-20">
            <SearchingFeed />
        </div>
    )
}