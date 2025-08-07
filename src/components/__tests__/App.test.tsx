import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('toggles theme correctly', () => {
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  );

  const button = screen.getByRole('button', { name: /toggle theme/i });

  expect(document.documentElement.classList.contains('dark')).toBe(false);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});
