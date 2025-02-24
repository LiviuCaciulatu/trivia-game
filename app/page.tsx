"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!language) {
      router.replace("/selectLanguage");
    } else {
      router.replace("/authentication");
    }
  }, [language, router]);

  return null;
}



