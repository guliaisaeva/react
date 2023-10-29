import { Component } from 'react';
import { Film } from './types/types';

interface FilmCardsProps {
  films: Film[];
}

class FilmCards extends Component<FilmCardsProps> {
  render() {
    const { films } = this.props;

    return (
      <div>
        <div className="card-container">
          {films.map((film, index) => (
            <div key={index} className="card">
              <h2>{film.title}</h2>
              <p>Director: {film.director}</p>
              <p>Producer: {film.producer}</p>
              <p>Release Date: {film.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FilmCards;
