'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import fr from '@/locales/fr';
import en from '@/locales/en';

const locales = { fr, en };

const I18nContext = createContext({ t: (key) => key, locale: 'fr', setLocale: () => {} });

// Nested key access: t('sidebar.overview') → locales.fr.sidebar.overview
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState('fr');

  useEffect(() => {
    const saved = localStorage.getItem('prospectia_locale');
    if (saved && locales[saved]) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale) => {
    if (locales[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem('prospectia_locale', newLocale);
    }
  }, []);

  const t = useCallback((key, replacements) => {
    let value = getNestedValue(locales[locale], key);
    if (value === undefined) {
      // Fallback to French
      value = getNestedValue(locales.fr, key);
    }
    if (value === undefined) return key;
    // Handle {{variable}} replacements
    if (replacements && typeof value === 'string') {
      Object.entries(replacements).forEach(([k, v]) => {
        value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v);
      });
    }
    return value;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
