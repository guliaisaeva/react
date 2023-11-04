import React from 'react';

interface FilmDetailsComponentProps {
  film: {
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
  };
}

const FilmDetailsComponent: React.FC<FilmDetailsComponentProps> = ({
  film,
}) => {
  if (!film) {
    return null;
  }
  return (
    <div className="film-details">
      <h2>Film Details</h2>
      <h3>Title: {film.title}</h3>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
      <p>Opening Crawl: {film.opening_crawl}</p>
    </div>
  );
};

export default FilmDetailsComponent;
