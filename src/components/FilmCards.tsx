import React from 'react';
import { Film } from './types/types';
import { Link } from 'react-router-dom';

interface FilmCardsProps {
  films: Film[];
  onFilmCardClick: (film: Film) => void;
}

const FilmCards: React.FC<FilmCardsProps> = ({ films, onFilmCardClick }) => {
  return (
    <div className="card-container">
      {films.map((film, index) => (
        <Link
          className="card-link"
          key={film.episode_id}
          to={`/details/${film.episode_id}`}
        >
          <div
            key={index}
            className="card"
            onClick={() => onFilmCardClick(film)}
          >
            <h2>{film.title}</h2>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
            <p>Release Date: {film.release_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FilmCards;
