import { render, screen, fireEvent } from '@testing-library/react';
import { useSelectedItemsStore } from '../../stores/selectedItemsStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from '../Dashboard';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../hooks/usePhotos', () => ({
  usePhotos: () => ({
    data: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Photo ${i + 1}`,
      url: `https://example.com/photo${i + 1}.jpg`,
      thumbnailUrl: `https://example.com/thumb${i + 1}.jpg`,
    })),
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));

beforeEach(() => {
  const { clearAll } = useSelectedItemsStore.getState();
  clearAll();
});

describe('Dashboard component', () => {
  it('renders all items with unchecked checkboxes initially', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(12);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('checks and unchecks items when clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    const isSelected = useSelectedItemsStore.getState().isSelected;
    expect(isSelected('1')).toBe(true);

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(isSelected('1')).toBe(false);
  });
});
