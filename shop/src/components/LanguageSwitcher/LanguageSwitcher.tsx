"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.scss"; 

// Добавьте 'export default' перед функцией
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: "ua" | "en") => {
    if (newLang !== language) {
      setLanguage(newLang);
    }
  };

  return (
    <div className={styles.switcher}>
      <button onClick={() => handleLanguageChange("ua")}>UA</button>
      <button onClick={() => handleLanguageChange("en")}>EN</button>
    </div>
  );
}