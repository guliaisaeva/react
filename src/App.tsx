// App.js
import { Component } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import FilmCards from './components/FilmCards';
import { fetchFilmData } from './services/ApiService';
import { Film } from './components/types/types';

interface AppProps {}

interface AppState {
  searchTerm: string;
  searchResults: Film[];
  loading: boolean;
  error: Error | null;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    this.search(savedSearchTerm || '');
  }

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    this.search(searchTerm);
    this.setState({ searchTerm: '' });
  };

  search = async (searchTerm: string) => {
    this.setState({ loading: true });

    try {
      const films = await fetchFilmData(searchTerm);
      this.setState({
        searchResults: films,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        searchResults: [],
        loading: false,
        error: error as Error,
      });
    }
  };
  // resetSearch = () => {
  //   localStorage.removeItem('searchTerm');
  //   this.setState({
  //     searchTerm: '',
  //     searchResults: [],
  //     loading: false,
  //     error: null,
  //   });
  // };
  render() {
    return (
      <div>
        <h1>Star Wars Films</h1>
        <SearchForm
          searchTerm={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        {/* <button onClick={this.resetSearch}>Clear Search</button> */}
        <SearchResults
          results={this.state.searchResults.map((film) => ({
            name: film.title,
            description: film.opening_crawl,
          }))}
        />
        <FilmCards films={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
