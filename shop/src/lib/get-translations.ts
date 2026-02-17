// lib/get-translations.ts
import { cookies } from "next/headers"; // Добавь этот импорт!
import en from "@/locales/en.json";
import ua from "@/locales/ua.json";

type Language = "en" | "ua";
const translations: Record<Language, any> = { en, ua };

export async function getTranslations() {
  // Читаем куки прямо с сервера
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("NEXT_LOCALE")?.value as Language;
  
  // Если в куке "en", используем его, иначе "ua"
  const lang: Language = (savedLang === "en" || savedLang === "ua") ? savedLang : "ua";

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, lang };
}