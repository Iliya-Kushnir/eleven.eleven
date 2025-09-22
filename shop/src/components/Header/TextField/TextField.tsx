"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import styles from "./TextField.module.scss";

interface Product {
  id: string;
  title: string;
}

const TextField = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 2) {
      const res = await searchProducts(newValue);
      const products: Product[] = res.products.edges.map(edge => edge.node);
      setResults(products);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search-for?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.fieldWrapper}>
      <input
        value={value}
        className={styles.input}
        placeholder="SEARCH"
        type="text"
        onChange={handleChange}
      />
      <button className={styles.button} type="submit">
        <Image
          width={20}
          height={20}
          src="/images/search-2.png"
          alt="search image"
        />
      </button>

      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((p) => {
            const numericId = p.id.split("/").pop();
            return (
              <li key={numericId}>
                <Link className={styles.text} href={`/products/${numericId}`}>
                  {p.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default TextField;
