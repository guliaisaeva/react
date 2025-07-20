// src/components/__tests__/SearchResults.test.tsx

import { render, screen } from '@testing-library/react';
import SearchResults from '../SearchResults';

describe('SearchResults', () => {
  it('renders nothing when results is empty', () => {
    const { container } = render(<SearchResults results={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all provided results', () => {
    const mockResults = [
      {
        name: 'A New Hope',
        description:
          'Director: George Lucas, Producer: Gary Kurtz, Rick McCallum, Release Date: 1977-05-25',
      },
      {
        name: 'The Empire Strikes Back',
        description:
          'Director: Irvin Kershner, Producer: Gary Kurtz, Rick McCallum, Release Date: 1980-05-17',
      },
    ];

    render(<SearchResults results={mockResults} />);

    expect(screen.getByText('Search Results:')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });
});
