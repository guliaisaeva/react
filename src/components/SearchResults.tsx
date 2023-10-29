// import { Component } from 'react';

// interface ResultsComponentProps {
//   results: Array<{ name: string; description: string }>;
// }

// class ResultsComponent extends Component<ResultsComponentProps> {
//   render() {
//     const { results } = this.props;

//     return (
//       <div>
//         <h2>Search Results</h2>
//         {results.length === 0 ? (
//           <p>No results found.</p>
//         ) : (
//           <ul>
//             {results.map((result, index) => (
//               <li key={index}>
//                 <h3>{result.name}</h3>
//                 <p>{result.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }
// }

// export default ResultsComponent;

import React from 'react';

interface ResultsComponentProps {
  results: Array<{ name: string; description: string }>;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results }) => {
  // Only render the component when results are available
  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsComponent;
