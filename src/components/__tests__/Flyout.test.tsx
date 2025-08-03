import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from '../Flyout';
import { useSelectedItemsStore } from '../../stores/selectedItemsStore';
import { downloadCSV } from '../../utils/downloadCSV';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('../../utils/downloadCSV', () => ({
  downloadCSV: vi.fn(),
}));

beforeEach(() => {
  const { clearAll } = useSelectedItemsStore.getState();
  clearAll();
  vi.clearAllMocks();
});

describe('Flyout component', () => {
  it('does not render when no items are selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it('renders with correct selected items count', () => {
    const { toggleItem } = useSelectedItemsStore.getState();

    toggleItem({ id: '1', name: 'Item 1', description: '', detailsUrl: '' });
    toggleItem({ id: '2', name: 'Item 2', description: '', detailsUrl: '' });

    render(<Flyout />);

    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });

  it('clears all selected items when "Unselect All" clicked', () => {
    const { toggleItem } = useSelectedItemsStore.getState();

    toggleItem({ id: '1', name: 'Item 1', description: '', detailsUrl: '' });

    render(<Flyout />);

    const button = screen.getByText(/Unselect All/i);
    fireEvent.click(button);

    expect(useSelectedItemsStore.getState().selectedItems.length).toBe(0);
    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it('calls downloadCSV with selected items on Download click', () => {
    const { toggleItem } = useSelectedItemsStore.getState();

    toggleItem({ id: '1', name: 'Item 1', description: '', detailsUrl: '' });

    render(<Flyout />);

    const button = screen.getByText(/Download/i);
    fireEvent.click(button);

    expect(downloadCSV).toHaveBeenCalledTimes(1);
    expect(downloadCSV).toHaveBeenCalledWith([
      { id: '1', name: 'Item 1', description: '', detailsUrl: '' },
    ]);
  });
});
