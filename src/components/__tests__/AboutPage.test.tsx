import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AboutPage from '../pages/AboutPage';

describe('AboutPage', () => {
  test('renders About page content correctly', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About This Application'
    );

    expect(
      screen.getByText(/This Star Wars Films app was built by Gulia Isaeva/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/The app is part of the RS School React course/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: /Visit the RS School React course/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://app.rs.school/course/schedule?course=react-2025-q3'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
