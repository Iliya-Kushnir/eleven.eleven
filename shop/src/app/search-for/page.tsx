import { Metadata } from "next";
import SearchingFieldWrapper from "@/components/SearchingField/SearchingFieldWrapper";

export const metadata: Metadata = {
  title: "Search | eleven:eleven",
  description: "Search for your favorite items in our store."
}

export default function Search() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center p-2.5 pb-2.5 pt-[75px] sm:p-20">
      {/* Вызываем клиентскую обертку, внутри которой отключен SSR */}
      <SearchingFieldWrapper />
    </div>
  );
}