import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
  });

  it('renders input and button', () => {
    render(<SearchForm searchTerm="" onSearch={onSearchMock} />);
    expect(screen.getByPlaceholderText(/enter film name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows initial searchTerm in input', () => {
    render(<SearchForm searchTerm="Dune" onSearch={onSearchMock} />);
    expect(screen.getByDisplayValue('Dune')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchForm searchTerm="" onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter film name/i);
    fireEvent.change(input, { target: { value: 'Oppenheimer' } });
    expect(screen.getByDisplayValue('Oppenheimer')).toBeInTheDocument();
  });

  it('calls onSearch with trimmed input when button clicked', () => {
    render(<SearchForm searchTerm="" onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter film name/i);

    fireEvent.change(input, { target: { value: '  Matrix  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearchMock).toHaveBeenCalledWith('Matrix');
  });
});
