import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('toggles theme correctly', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const button = screen.getByRole('button', { name: /toggle theme/i });

  expect(document.documentElement.classList.contains('dark')).toBe(false);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  fireEvent.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});
