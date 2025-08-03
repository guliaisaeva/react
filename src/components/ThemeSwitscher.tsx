import { useTheme } from './context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      aria-label="Toggle theme"
      className={`toggle-switch ${theme}`}
      onClick={toggleTheme}
    >
      <div className="toggle-thumb" />
      <span className="icon sun" aria-hidden="true">
        ☀️
      </span>
      <span className="icon moon" aria-hidden="true">
        🌙
      </span>
    </button>
  );
}
