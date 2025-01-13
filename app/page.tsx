"use client"
import { useLanguage } from "./context/LanguageContext";
import SelectLanguage from "./components/SelectLanguage/page";
import Authentication from "./components/Authentication/page";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div>

      {language === 'en' || language === 'ro' ? (
        <Authentication />
      ) : (
        <SelectLanguage />
      )}
    </div>
  );
}

