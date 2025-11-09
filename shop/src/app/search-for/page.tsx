// app/search-for/page.tsx
"use client";

import dynamic from "next/dynamic";



const SearchingFeedNoSSR = dynamic(
  () => import("@/components/SearchingField/SearchingField"),
  { ssr: false }
);

export default function Search() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
      <SearchingFeedNoSSR />
    </div>
  );
}