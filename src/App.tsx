import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import FilmCards from './components/FilmCards';
import { fetchFilmData } from './services/ApiService';
import { Film } from './components/types/types';
import ResultsComponent from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      setSearchTerm('');
      setSearchResults(films);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as Error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    search(searchTerm);
  };

  const search = async (searchTerm: string) => {
    setLoading(true);
    try {
      const films: Film[] = await fetchFilmData(searchTerm);
      setSearchTerm(searchTerm);
      setSearchResults(films);
      setLoading(false);
      setError(null);
    } catch (error) {
      setSearchResults([]);
      setLoading(false);
      setError(error as Error);
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Star Wars Films</h1>
        <SearchForm searchTerm={searchTerm} onSearch={handleSearch} />

        {loading ? (
          <p className="loading">Loading... Your adventure begins shortly!</p>
        ) : (
          <div>
            {searchTerm ? (
              <div>
                {searchResults.length > 0 ? (
                  <>
                    <ResultsComponent
                      results={searchResults.map((film) => ({
                        name: film.title,
                        description: film.opening_crawl,
                      }))}
                    />
                    <FilmCards films={itemsToDisplay} />
                  </>
                ) : (
                  <p className="not-found">Not Found</p>
                )}
              </div>
            ) : (
              <FilmCards films={itemsToDisplay} />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(searchResults.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {error && <p className="error-message">Error: {error.message}</p>}
      </div>
    </ErrorBoundary>
  );
};

export default App;
