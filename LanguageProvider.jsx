import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Initialize from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('spacerun-language') || 'en';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'he' : 'en';
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('spacerun-language', newLang);
      }
      return newLang;
    });
  };

  // Update localStorage whenever language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('spacerun-language', language);
    }
  }, [language]);

  const value = {
    language,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined || context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};