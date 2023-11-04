import React, { useState } from 'react';

interface SearchComponentProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  onSearch,
}) => {
  const [searchTermState, setSearchTermState] = useState<string>(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmedSearchTerm = searchTermState.trim();
    onSearch(trimmedSearchTerm);
  };

  return (
    <div className="searchform-box">
      <input
        type="text"
        placeholder="Enter Film Name"
        value={searchTermState}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchComponent;
