import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import * as ApiService from '../../services/ApiService';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import type { Mock } from 'vitest';

vi.mock('../../services/ApiService');

const mockFilms = [
  { title: 'A New Hope', opening_crawl: 'It is a period of civil war...' },
  { title: 'The Empire Strikes Back', opening_crawl: 'It is a dark time...' },
];

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('shows loading initially and then films', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    (ApiService.fetchFilmData as Mock).mockResolvedValue(mockFilms);

    render(<App />);

    expect(
      screen.getByText(/Loading... Your adventure begins shortly!/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(ApiService.fetchFilmData).toHaveBeenCalledWith('');
      expect(screen.getAllByText(/A New Hope/i).length).toBeGreaterThan(0);
    });
  });

  test('loads saved searchTerm from localStorage and fetches matching films', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('hope');
    (ApiService.fetchFilmData as Mock).mockResolvedValue([mockFilms[0]]);

    render(<App />);

    await waitFor(() => {
      expect(ApiService.fetchFilmData).toHaveBeenCalledWith('hope');
      expect(screen.getAllByText(/A New Hope/i).length).toBeGreaterThan(0);
    });
  });

  test('shows Not Found when no results', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('unknown');
    (ApiService.fetchFilmData as Mock).mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/No films found/i)).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    (ApiService.fetchFilmData as Mock).mockRejectedValue(
      new Error('Fetch failed')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument();
    });
  });
});
