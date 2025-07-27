import React, { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm';
import FilmCards from './components/FilmCards';
import { fetchFilmData } from './services/ApiService';
import { Film } from './components/types/types';
import ResultsComponent from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      search(savedSearchTerm);
    } else {
      fetchAllFilms();
    }
  }, []);

  const fetchAllFilms = async () => {
    try {
      const films: Film[] = await fetchFilmData('');
      setSearchResults(films);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all films:', error);
      setError(error as Error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    localStorage.setItem('searchTerm', trimmed);
    search(trimmed);
  };

  const search = async (term: string) => {
    setLoading(true);
    try {
      const films: Film[] = await fetchFilmData(term);
      setSearchTerm(term);
      setSearchResults(films);
      setError(null);
    } catch (error) {
      setSearchResults([]);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const throwError = () => {
    throw new Error('This is a test error triggered by the user.');
  };

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Star Wars Films</h1>

        <div className="mb-8">
          <SearchForm searchTerm={searchTerm} onSearch={handleSearch} />
        </div>

        <div>
          {error ? (
            <div role="alert" style={{ color: 'red' }}>
              <h2>Error:</h2>
              <p>{error.message}</p>
            </div>
          ) : loading ? (
            <p className="loading">Loading... Your adventure begins shortly!</p>
          ) : searchTerm ? (
            searchResults.length > 0 ? (
              <>
                <ResultsComponent
                  results={searchResults.map((film) => ({
                    name: film.title,
                    description: film.opening_crawl,
                  }))}
                />
                <FilmCards films={searchResults} />
              </>
            ) : (
              <p className="not-found">Not Found</p>
            )
          ) : (
            <FilmCards films={searchResults} />
          )}
        </div>

        <button className="error-btn" onClick={throwError}>
          Trigger Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
