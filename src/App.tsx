import React from 'react';
import Dashboard from './components/pages/Dashboard';
import { Flyout } from './components/Flyout';
import { ThemeProvider } from './components/context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitscher';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <ThemeSwitcher />
        <Dashboard />
        <Flyout />
      </div>
    </ThemeProvider>
  );
};

export default App;
