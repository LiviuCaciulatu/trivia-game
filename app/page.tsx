"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "./context/LanguageContext";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";

export default function Home() {
  const { setLanguage } = useLanguage();
  const router = useRouter();

  const handleLanguageSelection = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    router.push("/authentication");
  };

  return (
    <div>
      <SelectLanguage onSelectLanguage={handleLanguageSelection} />
    </div>
  );
}




