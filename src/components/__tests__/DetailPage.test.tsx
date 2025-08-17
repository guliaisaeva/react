import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as usePhotosModule from '../hooks/usePhotos';
import DetailPage from '../pages/DetailPage';
import { vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';
import type { Photo } from '../hooks/usePhotos';

const mockData: Photo = {
  albumId: 1,
  id: 5,
  title: 'Photo 5',
  url: 'https://example.com/photo5.jpg',
  thumbnailUrl: 'https://example.com/thumb5.jpg',
};

const mockUsePhotoByIdResult = {
  data: mockData,
  isLoading: false,
  isError: false,
  isSuccess: true,
  refetch: vi.fn(),
} as unknown as UseQueryResult<Photo, Error>;

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
