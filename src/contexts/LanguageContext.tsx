import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

type Language = 'en' | 'es' | 'fr' | 'hi' | 'gu';

// Extend the context type to include the translation function `t`
interface LanguageContextType extends Pick<UseTranslationResponse, 't' | 'i18n'> {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const { t, i18n } = useTranslation();

  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
    },
    t,
    i18n,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
