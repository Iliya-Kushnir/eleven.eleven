"use client";
import { useState } from "react";
import styles from "./ColorsComp.module.scss";

export interface Color {
  id: string;
  name: string;
  hex: string;
}

interface ColorsCompProps {
  colors: Color[];
  onSelect?: (color: Color) => void;
}

const ColorsComp: React.FC<ColorsCompProps> = ({ colors, onSelect }) => {
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleColors = showAll ? colors : colors.slice(0, 6);

  const handleSelect = (color: Color) => {
    setSelectedColorId(color.id);
    onSelect?.(color);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.colorsGrid}>
        {visibleColors.map((c) => (
          <button
            key={c.id}
            className={`${styles.colorBtn} ${selectedColorId === c.id ? styles.active : ""}`}
            style={{ backgroundColor: c.hex }}
            onClick={() => handleSelect(c)}
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
