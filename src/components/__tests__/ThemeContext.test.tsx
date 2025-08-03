import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { describe, expect, it } from 'vitest';

const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('should default to light theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme from light to dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });

    await user.click(button);
    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(button);
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
