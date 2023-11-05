import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm';
import FilmCards from '../FilmCards';
import { fetchFilmData } from '../../services/ApiService';
import { Film } from '../types/types';

import ErrorBoundary from '../ErrorBoundary';
import Pagination from '../Pagination';
import FilmDetailsComponent from '../pages/FilmDetails';
import { useNavigate, useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get('page') || '1', 10)
  );
  const [itemsPerPage] = useState(
    parseInt(queryParams.get('itemsPerPage') || '3', 10)
  );

  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());

    navigate(`?${params.toString()}`);
  }, [currentPage, itemsPerPage, navigate]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = searchResults.slice(startIndex, endIndex);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const handleFilmCardClick = (film: Film) => {
    setSelectedFilm(film);
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
      setTotalItems(films.length);
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
      setTotalItems(films.length);
      setLoading(false);
      setError(null);
      setSelectedFilm(null);
    } catch (error) {
      setSearchResults([]);
      setTotalItems(0);
      setLoading(false);
      setError(error as Error);
    }
  };

  return (
    <ErrorBoundary>
      <div className="page-container">
        <h1>Star Wars Films</h1>
        <SearchForm searchTerm={searchTerm} onSearch={handleSearch} />
        <div className="content-container ">
          <div className="film-list ">
            {loading ? (
              <p className="loading">
                Loading... Your adventure begins shortly!
              </p>
            ) : (
              <div className="main-box">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="card-container">
                      <FilmCards
                        films={itemsToDisplay}
                        onFilmCardClick={handleFilmCardClick}
                      />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      onPageChange={handlePageChange}
                    />
                  </div>
                ) : (
                  <p className="not-found">Sorry, Not Found</p>
                )}
              </div>
            )}
          </div>
          {selectedFilm && (
            <FilmDetailsComponent
              film={selectedFilm}
              onCloseClick={() => setSelectedFilm(null)}
            />
          )}
        </div>

        {error && <p className="error-message">Error: {error.message}</p>}
      </div>
    </ErrorBoundary>
  );
}

export default HomePage;
