// lib/get-translations.ts
import { cookies } from "next/headers"; // Добавь этот импорт!
import en from "@/locales/en.json";
import uk from "@/locales/uk.json";

type Language = "en" | "uk";
const translations: Record<Language, any> = { en, uk };

export async function getTranslations() {
  // Читаем куки прямо с сервера
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("NEXT_LOCALE")?.value as Language;
  
  // Если в куке "en", используем его, иначе "ua"
  const lang: Language = (savedLang === "en" || savedLang === "uk") ? savedLang : "uk";

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