
const translate = (key: string, language: 'en' | 'ro', translations: { [key: string]: { [key: string]: string } }): string => {
  return translations[language][key] || key;
};

export default translate;
