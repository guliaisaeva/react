import React, { useEffect } from 'react';
import { Film } from '../types/types';
import { useParams } from 'react-router-dom';
import { fetchFilmData } from '../../services/ApiService';

interface FilmDetailsComponentProps {
  film: Film | null;
  onCloseClick: () => void;
}

const FilmDetailsComponent: React.FC<FilmDetailsComponentProps> = ({
  film,
  onCloseClick,
}) => {
  const { filmId } = useParams<{ filmId: string }>();
  const handleCloseDetails = () => {
    onCloseClick();
  };

  useEffect(() => {
    if (filmId) {
      const fetchFilm = async (id: string) => {
        try {
          await fetchFilmData(id);
        } catch (error) {
          // Handle error
        }
      };

      fetchFilm(filmId);
    }
  }, [filmId]);
  if (!film) {
    return null;
  }

  return (
    <div className="film-details">
      <h2>Film Details</h2>
      <h3>Title: {film?.title}</h3>
      <p>Director: {film?.director}</p>
      <p>Producer: {film?.producer}</p>
      <p>Release Date: {film?.release_date}</p>
      <p>Opening Crawl: {film?.opening_crawl}</p>
      <button className="close-button" onClick={handleCloseDetails}>
        Close
      </button>
    </div>
  );
};

export default FilmDetailsComponent;
