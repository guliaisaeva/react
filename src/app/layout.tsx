'use client';
import '../index.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../components/context/ThemeContext';
import { ThemeSwitcher } from '../components/ThemeSwitscher';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { LanguageSwitcher } from '../components/LanguageSwitscher';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <div className="app-container">
              <div className="theme-switcher-wrapper">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
              <main>
                {' '}
                <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
              </main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
