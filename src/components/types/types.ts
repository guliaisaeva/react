export interface Film {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
  producer: string;
  opening_crawl: string;
  species: string[];
  characters: string[];
  planets: string[];
  url: string;
}

export interface FilmCardsProps {
  films: Film[];
}
