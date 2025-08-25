"use client";
import { useState } from "react";
import styles from "./ColorsComp.module.scss";

type Color = {
  id: number;
  color: string;
};

const ColorsComp = () => {
  const colors: Color[] = [
    { id: 1, color: "#f4cccc" },
    { id: 2, color: "#d9ead3" },
    { id: 3, color: "#cfe2f3" },
    { id: 4, color: "#fff2cc" },
    { id: 5, color: "#e4d5f7" },
    { id: 6, color: "#d0e0e3" },
    { id: 7, color: "#ffd6d6" },
    { id: 8, color: "#e6f2e6" },
    { id: 9, color: "#d9eaf7" },
    { id: 10, color: "#fff7e6" },
    { id: 11, color: "#f2e6f7" },
    { id: 12, color: "#e6f7f7" },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleColors = showAll ? colors : colors.slice(0, 6);

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.colorsGrid}>
        {visibleColors.map((c) => (
          <button
            key={c.id}
            className={styles.colorBtn}
            style={{ backgroundColor: c.color }}
          />
        ))}
      </div>

      {colors.length > 6 && (
        <button
          className={styles.openBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "-" : "+"}
        </button>
      )}
    </div>
  );
};

export default ColorsComp;
