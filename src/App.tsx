import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import Navbar from './Navbar';
import AboutPage from './components/pages/AboutPage';
import MainPage from './components/pages/MainPage';
import FilmDetail from './components/FilmDetail';
import NotFoundPage from './components/pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

const AppLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="films/:id" element={<FilmDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
