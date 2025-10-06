"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: "flex", gap: "8px", position: "absolute",  bottom: "40px", left: "20px"}}>
      <button
        onClick={() => setLanguage("ua")}
        style={{ cursor: "pointer", fontWeight: language === "ua" ? "bold" : "normal" }}
      >
        🇺🇦 UA
      </button>
      <button
        onClick={() => setLanguage("en")}
        style={{ cursor: "pointer", fontWeight: language === "en" ? "bold" : "normal" }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
