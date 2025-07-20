// src/components/__tests__/App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import * as ApiService from '../../services/ApiService';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import type { Mock } from 'vitest';

// Mock the API module
vi.mock('../../services/ApiService');

const mockFilms = [
  { title: 'A New Hope', opening_crawl: 'It is a period of civil war...' },
  { title: 'The Empire Strikes Back', opening_crawl: 'It is a dark time...' },
];

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    // Silence error logs from React error boundary in tests
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

  //   render(<App />);

  //   const input = screen.getByRole('textbox');
  //   const user = userEvent.setup();

  //   // type search term
  //   await user.clear(input);
  //   await user.type(input, 'empire');

  //   // click search button explicitly by text or role
  //   const searchButton = screen.getByRole('button', { name: /search/i });
  //   await user.click(searchButton);

  //   // wait for localStorage.setItem call
  //   await waitFor(() => {
  //     expect(setItemSpy).toHaveBeenCalledWith('searchTerm', 'empire');
  //   });

  //   // wait for API call
  //   await waitFor(() => {
  //     expect(ApiService.fetchFilmData).toHaveBeenCalledWith('empire');
  //   });

  //   // wait for UI update
  //   await waitFor(() => {
  //     expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
  //   });
  // });

  test('shows Not Found when no results', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('unknown');
    (ApiService.fetchFilmData as Mock).mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
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

  test('shows error boundary fallback UI when Trigger Error button is clicked', async () => {
    render(<App />);
    const btn = screen.getByText(/Trigger Error/i);
    const user = userEvent.setup();

    await user.click(btn);

    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Check the console for details/i)
    ).toBeInTheDocument();

    // Ensure main content is hidden when error boundary triggers
    expect(screen.queryByText(/Star Wars Films/i)).not.toBeInTheDocument();
  });
});
