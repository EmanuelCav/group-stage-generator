import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
  t: (scope: string, options?: object) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: i18n.locale,
  changeLanguage: async () => { },
  t: (scope, options) => i18n.t(scope, options),
});

export const LanguageProvider = ({ children }: PropsWithChildren) => {

  const [language, setLanguage] = useState<string>(i18n.locale);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      const savedLang = await AsyncStorage.getItem("language");
      if (savedLang) {
        i18n.locale = savedLang;
        setLanguage(savedLang);
      }
    };
    loadSavedLanguage();
  }, []);

  const changeLanguage = async (newLang: string) => {
    i18n.locale = newLang;
    setLanguage(newLang);
    await AsyncStorage.setItem("language", newLang);
  };

  const t = (scope: string, options?: object) => {
    return i18n.t(scope, { ...options, locale: language });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);