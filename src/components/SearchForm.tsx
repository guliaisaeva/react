import React, { useState, useEffect } from 'react';

interface SearchComponentProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchComponentProps> = ({
  searchTerm: initialSearchTerm,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    onSearch(trimmed);
  };

  return (
    <div className="searchform-box">
      <input
        type="text"
        placeholder="Enter Film Name"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchForm;
