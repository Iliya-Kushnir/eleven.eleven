"use client"
import { useState } from "react";
import { searchProducts } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import styles from "./TextField.module.scss"

const TextField = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 2) {
      const res = await searchProducts(newValue);
      setResults(res.products.edges.map(edge => edge.node));
    } else {
      setResults([]);
    }
  };

  console.log("this is products info", results);

  return (
    <div className={styles.fieldWrapper}>
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
            const numericId = p.id.split("/").pop(); // достаем только цифры
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
    </div>
  );
};

export default TextField;
