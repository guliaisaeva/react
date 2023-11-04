import React from 'react';
import { Film } from './types/types';

interface FilmCardsProps {
  films: Film[];
  onFilmCardClick: (film: Film) => void;
}

const FilmCards: React.FC<FilmCardsProps> = ({ films, onFilmCardClick }) => {
  return (
    <div className="card-container">
      {films.map((film, index) => (
        <div key={index} className="card" onClick={() => onFilmCardClick(film)}>
          <h2>{film.title}</h2>
          <p>Director: {film.director}</p>
          <p>Producer: {film.producer}</p>
          <p>Release Date: {film.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default FilmCards;
