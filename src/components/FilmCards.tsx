import React, { Component } from 'react';

class FilmCards extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      films: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({ films: data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    const { films } = this.props;

    return (
      <div>
        <h1>Star Wars Films</h1>
        <div className="card-container">
          {films.map(
            (
              film: {
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                director:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                producer:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                release_date:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <div key={index} className="card">
                <h2>{film.title}</h2>
                <p>Director: {film.director}</p>
                <p>Producer: {film.producer}</p>
                <p>Release Date: {film.release_date}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default FilmCards;
