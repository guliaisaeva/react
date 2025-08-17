import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config';

i18n.use(initReactI18next).init({
  ...nextI18NextConfig.i18n,
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
  resources: {
    tr: { common: require('public/locales/tr/common.json') },
    en: { common: require('public/locales/en/common.json') },
  },
});

export default i18n;
