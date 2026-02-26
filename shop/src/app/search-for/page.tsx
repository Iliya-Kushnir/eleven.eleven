import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Search | eleven:eleven",
  description: "Search for your favorite items in our store."
}

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