'use client';

import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'tr' | 'en') => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={() => changeLanguage('tr')}
        style={{
          padding: '0.3rem 0.6rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: i18n.language === 'tr' ? '#007bff' : 'white',
          color: i18n.language === 'tr' ? 'white' : 'black',
          cursor: 'pointer',
        }}
      >
        TR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          padding: '0.3rem 0.6rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: i18n.language === 'en' ? '#007bff' : 'white',
          color: i18n.language === 'en' ? 'white' : 'black',
          cursor: 'pointer',
        }}
      >
        EN
      </button>
    </div>
  );
}
