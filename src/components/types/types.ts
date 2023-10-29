export interface Film {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
  producer: string;
  opening_crawl: string;
  species: string[];
  // Add other properties as needed
}

export interface FilmCardsProps {
  films: Film[];
}
