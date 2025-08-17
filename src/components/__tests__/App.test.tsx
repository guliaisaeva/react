'use client';

import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../../components/context/ThemeContext';
import { ThemeSwitcher } from '../../components/ThemeSwitscher';

test('toggles theme correctly', () => {
  const queryClient = new QueryClient();

  render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeSwitcher />
      </QueryClientProvider>
    </ThemeProvider>
  );

  const button = screen.getByRole('button', { name: /toggle theme/i });

  expect(document.documentElement.classList.contains('dark')).toBe(false);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});
