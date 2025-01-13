import en from '../locales/en/en.json';
import ro from '../locales/ro/ro.json';

const translations: Record<string, any> = {
  en,
  ro,
};

export const translate = (lang: string, key: string): string => {
  return translations[lang]?.[key] || key;
};
