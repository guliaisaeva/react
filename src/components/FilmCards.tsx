import React from 'react';
import { Film } from './types/types';
import { useNavigate } from 'react-router-dom';

interface FilmCardsProps {
  films: Film[];
  onFilmClick?: (index: number) => void;
}

const FilmCards: React.FC<FilmCardsProps> = ({ films }) => {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      {films.map((film, index) => (
        <div
          key={index}
          className="card"
          role="button"
          onClick={() => navigate(`/films/${film.episode_id}`)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate(`/films/${film.episode_id}`);
            }
          }}
        >
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
