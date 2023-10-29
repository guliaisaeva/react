import React, { Component } from 'react';

interface SearchComponentProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchComponentState {
  searchTerm: string;
}

class SearchComponent extends Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = { searchTerm: this.props.searchTerm };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    const searchTerm = this.state.searchTerm.trim();
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className="searchform-box">
        <input
          type="text"
          placeholder="Enter Film Name"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
