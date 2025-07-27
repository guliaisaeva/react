import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Film } from '../types/types';
import { fetchFilmData } from '../../services/ApiService';
import SearchForm from '../SearchForm';
import FilmCards from '../FilmCards';
import Pagination from '../Pagination';

const FILMS_PER_PAGE = 5;

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page') || '1');

  const performSearch = useCallback(async (term: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await fetchFilmData(term);
      setFilms(results);
      setSearchTerm(term);
    } catch (err) {
      setError(err as Error);
      setFilms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('searchTerm') || '';
    setSearchTerm(saved);
    performSearch(saved);
  }, [performSearch]);
  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    performSearch(term);
  };

  const totalPages = Math.ceil(films.length / FILMS_PER_PAGE);
  const startIndex = (currentPage - 1) * FILMS_PER_PAGE;
  const pagedFilms = films.slice(startIndex, startIndex + FILMS_PER_PAGE);

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  const openDetails = (film: Film) => {
    const filmId = film.url.split('/').filter(Boolean).pop();
    navigate(`/films/${filmId}`);
  };

  return (
    <div className="flex max-w-6xl mx-auto p-6 gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Star Wars Films</h1>

        <SearchForm searchTerm={searchTerm} onSearch={handleSearch} />

        {loading && <p>Loading films...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {!loading && !error && (
          <>
            {pagedFilms.length > 0 ? (
              <>
                <FilmCards
                  films={pagedFilms}
                  onFilmClick={(i: number) => openDetails(pagedFilms[i])}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
            ) : (
              <p>No films found for &quot;{searchTerm}&quot;</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
