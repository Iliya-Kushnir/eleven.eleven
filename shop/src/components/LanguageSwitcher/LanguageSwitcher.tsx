"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.scss"; 

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: "uk" | "en") => {
    if (newLang !== language) {
      setLanguage(newLang);
    }
  };

  return (
    <div className={styles.switcher}>
      <button 
        onClick={() => handleLanguageChange("uk")}
        className={language === "uk" ? styles.active : ""}
      >
        UA
      </button>
      <span className={styles.divider}>|</span>
      <button 
        onClick={() => handleLanguageChange("en")}
        className={language === "en" ? styles.active : ""}
      >
        EN
      </button>
    </div>
  );
}