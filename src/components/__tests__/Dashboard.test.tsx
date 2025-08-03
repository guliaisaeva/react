import { render, screen, fireEvent } from '@testing-library/react';
import { useSelectedItemsStore } from '../../stores/selectedItemsStore';
import { beforeEach, describe, expect, it } from 'vitest';
import Dashboard from '../pages/Dashboard';

beforeEach(() => {
  const { clearAll } = useSelectedItemsStore.getState();
  clearAll();
});

describe('Dashboard component', () => {
  it('renders all items with unchecked checkboxes initially', () => {
    render(<Dashboard />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(10);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('checks and unchecks items when clicked', () => {
    render(<Dashboard />);

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    const isSelected = useSelectedItemsStore.getState().isSelected;
    expect(isSelected('0')).toBe(true);

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(isSelected('0')).toBe(false);
  });
});
