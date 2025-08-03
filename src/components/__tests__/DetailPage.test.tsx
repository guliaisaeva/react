import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import { describe, it, expect } from 'vitest';

describe('DetailPage', () => {
  it('renders flower detail and back button works', () => {
    render(
      <MemoryRouter initialEntries={['/details/5']}>
        <Routes>
          <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Flower 5/i)).toBeInTheDocument();
    expect(screen.getByText(/This is detail for/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
  });
});
