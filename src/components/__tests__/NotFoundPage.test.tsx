import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  test('renders 404 message and link', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
    expect(
      screen.getByText(/Oops! The page you’re looking for does not exist./i)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Go Back Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
