import { useTheme } from './context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4">
      <label>Theme: </label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
