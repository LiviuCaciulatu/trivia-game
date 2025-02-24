"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import SelectLanguage from "../components/SelectLanguage/SelectLanguage";

const SelectLanguagePage = () => {
  const { setLanguage } = useLanguage();
  const router = useRouter();

  const handleLanguageSelection = (lang: string) => {
    setLanguage(lang);
    router.push("/authentication");
  };

  return <SelectLanguage onSelectLanguage={handleLanguageSelection} />;
};

export default SelectLanguagePage;
