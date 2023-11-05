import React, { useEffect, useState } from 'react';
import { Film } from '../types/types';
import { Outlet, useParams } from 'react-router-dom';
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
  const [filmDetails, setFilmDetails] = useState<Film[]>([]);

  useEffect(() => {
    if (film && filmId) {
      fetchFilmData(filmId)
        .then((data) => {
          setFilmDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching film details:', error);
        });
    }
  }, [film, filmId]);

  if (!film) {
    return <p>Film details not found.</p>;
  }
  const handleCloseDetails = () => {
    onCloseClick();
  };

  if (filmDetails) {
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
        <Outlet />
      </div>
    );
  } else {
    return <p>Film details not found.</p>;
  }
};

export default FilmDetailsComponent;
