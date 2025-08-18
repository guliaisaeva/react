import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config.mjs';
import trCommon from './src/public/locales/tr.json';
import enCommon from './src/public/locales/en.json';

i18n.use(initReactI18next).init({
  ...nextI18NextConfig.i18n,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    tr: { common: trCommon },
    en: { common: enCommon },
  },
});

export default i18n;
