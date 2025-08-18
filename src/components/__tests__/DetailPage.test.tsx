import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ClientPhotoDetail from '../../app/details/[id]/ClientPhotoDetail';

const mockPhoto = {
  id: 5,
  author: 'Photo 5',
  url: 'https://example.com/photo5.jpg',
  download_url: 'https://example.com/photo5.jpg',
};

vi.mock('../hooks/usePhotos', () => ({
  usePhotoById: () => ({
    data: mockPhoto,
    isLoading: false,
    isError: false,
    isSuccess: true,
    refetch: vi.fn(),
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: vi.fn() }),
  usePathname: () => '/details/5',
}));
describe('ClientPhotoDetail', () => {
  it('renders photo and back button', () => {
    render(<ClientPhotoDetail />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Photo 5'
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
  });
});
