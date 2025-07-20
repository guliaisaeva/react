import { render, screen } from '@testing-library/react';
import FilmCards from '../FilmCards';
import type { Film } from '../types/types';
import { describe, expect, test } from 'vitest';

describe('FilmCards', () => {
  const films: Film[] = [
    {
      title: 'A New Hope',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
      episode_id: 0,
      opening_crawl: '',
      species: [],
      characters: [],
      planets: [],
      url: '',
    },
    {
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz',
      release_date: '1980-05-21',
      episode_id: 0,
      opening_crawl: '',
      species: [],
      characters: [],
      planets: [],
      url: '',
    },
  ];

  test('renders film cards with correct information', () => {
    render(<FilmCards films={films} />);
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
    expect(screen.getByText(/Director: George Lucas/)).toBeInTheDocument();
    expect(screen.getByText(/Director: Irvin Kershner/)).toBeInTheDocument();
    expect(screen.getAllByText(/Producer: Gary Kurtz/)).toHaveLength(2);
    expect(screen.getByText(/Release Date: 1977-05-25/)).toBeInTheDocument();
    expect(screen.getByText(/Release Date: 1980-05-21/)).toBeInTheDocument();
  });

  test('renders empty container when no films', () => {
    const { container } = render(<FilmCards films={[]} />);
    expect(container.querySelector('.card-container')).toBeInTheDocument();
    expect(container.querySelectorAll('.card').length).toBe(0);
  });
});
