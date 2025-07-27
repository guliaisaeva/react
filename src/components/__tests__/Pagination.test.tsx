import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { describe, test, expect, vi } from 'vitest';

describe('Pagination Component', () => {
  test('renders correct number of page buttons', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('Prev button is disabled on first page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  test('Next button is disabled on last page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />
    );
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('calls onPageChange with correct page number when page buttons clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText('1'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByText('Prev'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('current page button has active style', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    const activeBtn = screen.getByText('3');
    expect(activeBtn).toHaveStyle('background-color: #134441');
    expect(activeBtn).toHaveStyle('color: rgb(255, 255, 255)');
    expect(activeBtn).toHaveStyle('font-weight: bold');
  });
});
