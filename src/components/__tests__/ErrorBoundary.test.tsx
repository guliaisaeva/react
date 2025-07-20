import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error('Test error');
  };

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Child')).toBeInTheDocument();
  });

  test('renders fallback UI when error occurs in children', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Check the console for details.')
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
