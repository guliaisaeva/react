import React, { ChangeEventHandler, Component } from 'react';
import FilmCards from './components/FilmCards';
import { Film } from './components/types/types';

interface State {
  films: Film[]; // Initialize films as an empty array
  filteredFilms: Film[];
  searchQuery: string;
}
class App extends Component<{}, State> {
  handleSearch: ChangeEventHandler<HTMLInputElement> | undefined;
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: '',
      films: [], // Initialize films as an empty array
      filteredFilms: [],
    };
  }

  // ... rest of your code ...

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search by film title"
          onChange={this.handleSearch}
        />
        <FilmCards films={this.state.filteredFilms} />
      </div>
    );
  }
}

export default App;
