import React from 'react';

interface ResultsComponentProps {
  results: Array<{ name: string; description: string }>;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="searchresult-box">
      <h2>Search Results:</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="searchresult-content">
          {results.map((result, index) => (
            <div key={index}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
