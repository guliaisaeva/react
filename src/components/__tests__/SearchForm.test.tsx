import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchComponent from '../SearchForm';

describe('SearchComponent', () => {
  it('renders input and button', () => {
    render(<SearchComponent searchTerm="" onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/enter film name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
