import { Component } from 'react';

interface SearchResultsProps {
  results: string[]; // Replace with the actual type of your search results
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="SearchResults">
        {results.map((result, index) => (
          <div key={index} className="SearchResultCard">
            {result}
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
