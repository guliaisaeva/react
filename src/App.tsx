import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import FilmDetails from './components/pages/FilmDetails';
import { Film } from './components/types/types';
import { AppProvider } from './components/AppContext';
import { useState } from 'react';

const App: React.FC = () => {
  const [filmData, setFilmData] = useState<Film | null>(null);
  const handleCloseDetails = () => {
    setFilmData(null);
  };

  return (
    <AppProvider>
      <HomePage />
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/film-details/:filmId"
          element={
            <FilmDetails film={filmData} onCloseClick={handleCloseDetails} />
          }
        />
      </Router>
      ;
    </AppProvider>
  );
};

export default App;
