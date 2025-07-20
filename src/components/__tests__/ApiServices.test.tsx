import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { Film } from '../types/types';
import { fetchFilmData } from '../../services/ApiService';

describe('fetchFilmData', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and returns film data successfully', async () => {
    const mockFilms: Film[] = [
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
    ];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ results: mockFilms }),
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    const films = await fetchFilmData('hope');

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/films/?search=hope'
    );
    expect(films).toEqual(mockFilms);
  });

  it('returns empty array if results are missing or not an array', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ results: null }),
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    const films = await fetchFilmData('unknown');

    expect(films).toEqual([]);
  });

  it('throws error when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Not Found',
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    await expect(fetchFilmData('fail')).rejects.toThrow(
      'Network response was not ok'
    );
  });

  it('throws and logs error on fetch failure', async () => {
    const error = new Error('Fetch failed');
    (global.fetch as Mock).mockRejectedValue(error);

    await expect(fetchFilmData('error')).rejects.toThrow('Fetch failed');
    expect(console.error).toHaveBeenCalledWith('Error fetching data:', error);
  });
});
