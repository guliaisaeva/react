import { useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm';
import FilmCards from '../FilmCards';
import { fetchFilmData } from '../../services/ApiService';
import { Film } from '../types/types';

import ErrorBoundary from '../ErrorBoundary';
import Pagination from '../Pagination';
import FilmDetailsComponent from '../pages/FilmDetails';
import { useNavigate, Outlet } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const queryParams = useMemo(() => new URLSearchParams(location.search), []);

  const [currentPage] = useState(parseInt(queryParams.get('page') || '1', 10));
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
    params.set('itemsPerPage', itemsPerPage.toString());

    navigate(`?${params.toString()}`);
  }, [currentPage, itemsPerPage, navigate]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = searchResults.slice(startIndex, endIndex);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  const handleFilmItemClick = (film: Film) => {
    navigate(`?page=${currentPage}&filmId=${film.episode_id}`);
  };

  const handleCloseDetails = () => {
    setSelectedFilm(null);
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

  useEffect(() => {
    const filmIdParam = queryParams.get('filmId');
    if (filmIdParam) {
      const film = searchResults.find(
        (film) => film.episode_id === parseInt(filmIdParam, 10)
      );
      if (film) {
        setSelectedFilm(film);
      }
    }
  }, [queryParams, searchResults]);

  const fetchAllFilms = async () => {
    try {
      const films: Film[] = await fetchFilmData('');
      setSearchTerm('');
      setSearchResults(films);
      setTotalItems(films.length);
      setLoading(false);
      setSelectedFilm(null);
    } catch (error) {
      setLoading(false);
      setError(error as Error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    search(searchTerm);
    setSelectedFilm(null);
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
                        onFilmCardClick={handleFilmItemClick}
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
              onCloseClick={handleCloseDetails}
            />
          )}
        </div>

        {error && <p className="error-message">Error: {error.message}</p>}
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default HomePage;
