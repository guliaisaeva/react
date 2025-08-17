'use client';
import '../index.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../components/context/ThemeContext';
import { ThemeSwitcher } from '../components/ThemeSwitscher';

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
              </div>
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
