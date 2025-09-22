"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import Image from "next/image";
import styles from "./SearchPage.module.scss";

const SearchingFeed = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  return (
    <div className={styles.wrapperFeed}>
        <div className={styles.inputWrapper}>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />

            <button className={styles.button} type="submit">
                <Image
                width={20}
                height={20}
                src="/images/search-2.png"
                alt="search image"
                />
            </button>
        </div>

      <ProductsFeed filter="all" searchTerm={searchTerm} />
    </div>
  );
};

export default SearchingFeed;
