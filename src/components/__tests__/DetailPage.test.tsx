import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import * as usePhotosHook from '../../components/hooks/usePhotos';

import * as nextNavigation from 'next/navigation';
import ClientPhotoDetail from '../../app/details/[id]/ClientPhotoDetail';
import { UseQueryResult } from '@tanstack/react-query';

const mockData = {
  id: 5,
  author: 'Photo 5',
  url: 'https://example.com/photo5.jpg',
  download_url: 'https://example.com/photo5.jpg',
};

const mockUsePhotoByIdResult = {
  data: mockData,
  isLoading: false,
  isError: false,
  isSuccess: true,
  refetch: vi.fn(),
} as unknown as UseQueryResult<usePhotosHook.Photo, Error>;

vi.spyOn(nextNavigation, 'useRouter').mockReturnValue({
  back: vi.fn(),
} as unknown as ReturnType<typeof nextNavigation.useRouter>);

vi.spyOn(nextNavigation, 'usePathname').mockReturnValue('/details/5');

vi.spyOn(usePhotosHook, 'usePhotoById').mockReturnValue(mockUsePhotoByIdResult);

describe('ClientPhotoDetail', () => {
  it('renders photo details and back button works', () => {
    render(<ClientPhotoDetail />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Photo 5'
    );
    expect(screen.getByText(/This is detail for/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    const router = nextNavigation.useRouter();
    expect(router.back).toHaveBeenCalled();
  });
});
