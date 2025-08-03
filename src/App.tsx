import React from 'react';
import { Flyout } from './components/Flyout';
import { ThemeProvider } from './components/context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitscher';
import { useLocation } from 'react-router-dom';
import AppRoutes from './components/Routes';

const App: React.FC = () => {
  const location = useLocation();
  return (
    <ThemeProvider>
      <div className="app-container">
        <div className="theme-switcher-wrapper">
          <ThemeSwitcher />
        </div>
        <AppRoutes />
        {location.pathname === '/' && <Flyout />}
      </div>
    </ThemeProvider>
  );
};

export default App;
