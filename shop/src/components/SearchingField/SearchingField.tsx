"use client";
import { useState } from "react";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import styles from "./SearchPage.module.scss";

const SearchingFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Поисковая строка только на этой странице */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* Передаем searchTerm в ProductsFeed через пропс */}
      <ProductsFeed filter="all" searchTerm={searchTerm} />
    </div>
  );
};

export default SearchingFeed;