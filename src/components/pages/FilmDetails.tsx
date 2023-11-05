import React from 'react';
import { Film } from '../types/types';

interface FilmDetailsComponentProps {
  film: Film | null;
  onCloseClick: () => void;
}

const FilmDetailsComponent: React.FC<FilmDetailsComponentProps> = ({
  film,
  onCloseClick,
}) => {
  if (!film) {
    return null;
  }

  const handleCloseDetails = () => {
    onCloseClick(); // Call the onCloseClick function when the close button is clicked
  };
  return (
    <div className="film-details">
      <h2>Film Details</h2>
      <h3>Title: {film.title}</h3>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
      <p>Opening Crawl: {film.opening_crawl}</p>
      <button className="close-button" onClick={handleCloseDetails}>
        Close
      </button>
    </div>
  );
};

export default FilmDetailsComponent;
