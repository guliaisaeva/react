import { Component } from 'react';
import SearchComponent from './components/SearchForm';
import ResultsComponent from './components/SearchResults';
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
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () =>
        this.search(savedSearchTerm)
      );
    }
  }

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    this.search(searchTerm);
  };
  search = async (searchTerm: string) => {
    this.setState({ loading: true });

    try {
      const data = await fetchFilmData(searchTerm);

      this.setState({
        searchResults: data,
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

  render() {
    return (
      <div>
        <SearchComponent
          searchTerm={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        <ResultsComponent
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
