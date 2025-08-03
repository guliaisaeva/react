import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('ThemeSwitcher functionality', () => {
  it('toggles between light and dark mode', () => {
    render(<App />);

    const select = screen.getByRole('combobox');

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.change(select, { target: { value: 'dark' } });
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.change(select, { target: { value: 'light' } });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
