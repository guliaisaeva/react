import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from '../Flyout';
import { useSelectedItemsStore } from '../../stores/selectedItemsStore';
import { downloadCSV } from '../../utils/downloadCSV';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../utils/downloadCSV', () => ({
  downloadCSV: vi.fn(),
}));

beforeEach(() => {
  useSelectedItemsStore.getState().clearAll();
  vi.clearAllMocks();
});

describe('Flyout component', () => {
  it('does not render when no items are selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/Flowers selected/i)).not.toBeInTheDocument();
  });

  it('renders with correct selected items count', () => {
    useSelectedItemsStore.getState().toggleItem({
      id: '1',
      name: 'Flower 1',
      description: '',
      detailsUrl: '',
    });
    useSelectedItemsStore.getState().toggleItem({
      id: '2',
      name: 'Flower 2',
      description: '',
      detailsUrl: '',
    });

    render(<Flyout />);
    expect(screen.getByText(/2 Flowers selected/i)).toBeInTheDocument();
  });

  it('clears all selected items when "Unselect All" clicked', () => {
    useSelectedItemsStore.getState().toggleItem({
      id: '1',
      name: 'Flower 1',
      description: '',
      detailsUrl: '',
    });

    render(<Flyout />);
    const button = screen.getByText(/Unselect All/i);
    fireEvent.click(button);

    expect(useSelectedItemsStore.getState().selectedItems.length).toBe(0);
    expect(screen.queryByText(/Flowers selected/i)).not.toBeInTheDocument();
  });

  it('calls downloadCSV with selected items on Download click', () => {
    useSelectedItemsStore.getState().toggleItem({
      id: '1',
      name: 'Flower 1',
      description: '',
      detailsUrl: '',
    });

    render(<Flyout />);
    const button = screen.getByText(/Download/i);
    fireEvent.click(button);

    expect(downloadCSV).toHaveBeenCalledTimes(1);
    expect(downloadCSV).toHaveBeenCalledWith([
      { id: '1', name: 'Flower 1', description: '', detailsUrl: '' },
    ]);
  });
});
