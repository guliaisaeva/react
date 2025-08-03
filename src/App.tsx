import React from 'react';
import Dashboard from './components/pages/Dashboard';
import { Flyout } from './components/Flyout';

const App: React.FC = () => {
  return (
    <>
      <Dashboard />;
      <Flyout />;
    </>
  );
};

export default App;
