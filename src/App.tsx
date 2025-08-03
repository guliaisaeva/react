import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import Navbar from './Navbar';

const AppLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
