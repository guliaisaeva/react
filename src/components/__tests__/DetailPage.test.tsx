import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as usePhotosModule from '../hooks/usePhotos';
import DetailPage from '../pages/DetailPage';
import { vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

const mockData = { id: '5', title: 'Photo 5' };

const mockUsePhotoByIdResult: UseQueryResult<
  { id: string; title: string },
  Error
> = {
  status: 'success',
  data: mockData,
  error: null,
  isLoading: false,
  isError: false as const,
  isFetching: false,
  isSuccess: true,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isRefetching: false,
  isLoadingError: false,
  isRefetchError: false,
  isPaused: false,
  isInitialLoading: false,
  isPlaceholderData: false,
  isPending: false as const,
  isStale: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  fetchStatus: 'idle',
  isEnabled: true,
  promise: Promise.resolve(mockData),
  refetch: vi.fn(),
};

describe('DetailPage', () => {
  beforeEach(() =>
    vi
      .spyOn(usePhotosModule, 'usePhotoById')
      .mockReturnValue(mockUsePhotoByIdResult)
  );

  it('renders photo detail and back button works', () => {
    render(
      <MemoryRouter initialEntries={['/details/5']}>
        <Routes>
          <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Photo 5'
    );
    expect(screen.getByText(/This is detail for/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
  });
});
