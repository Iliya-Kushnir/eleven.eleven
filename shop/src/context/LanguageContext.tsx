"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import en from "@/locales/en.json";
import ua from "@/locales/ua.json";

type Language = "en" | "ua";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, any> = { en, ua };
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Инициализируем язык. Если в куках пусто — ставим "ua"
  const [language, setLanguageState] = useState<Language>("ua");

  useEffect(() => {
    const savedLang = Cookies.get("NEXT_LOCALE") as Language;
    if (savedLang) setLanguageState(savedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Сохраняем выбор в куки на год
    Cookies.set("NEXT_LOCALE", lang, { expires: 365, path: '/' });
    // Перезагружаем страницу, чтобы Server Components обновили текст
    window.location.reload();
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};