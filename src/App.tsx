import { Component } from 'react';
import SearchForm from './components/SearchForm';
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
      this.setState({ searchTerm: savedSearchTerm || '' });
      this.search(savedSearchTerm);
    } else {
      this.fetchAllFilms();
    }
  }
  fetchAllFilms = async () => {
    try {
      const films: Film[] = await fetchFilmData('');
      this.setState({
        searchResults: films,
      });
    } catch (error) {
      console.error('Error fetching all films:', error);
    }
  };

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    this.setState({ searchTerm });
    this.search(searchTerm);
  };

  search = async (searchTerm: string) => {
    this.setState({ loading: true });

    try {
      const films: Film[] = await fetchFilmData(searchTerm);
      this.setState({
        searchTerm,
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

  render() {
    const { searchResults, searchTerm, loading } = this.state;

    return (
      <div>
        {loading ? ( // Display loading message for the entire content inside the <div>
          <p>Loading...</p>
        ) : (
          <>
            <h1>Star Wars Films</h1>
            <SearchForm
              searchTerm={this.state.searchTerm}
              onSearch={this.handleSearch}
            />

            {searchTerm && searchResults.length > 0 ? (
              <ResultsComponent
                results={searchResults.map((film) => ({
                  name: film.title,
                  description: film.opening_crawl,
                }))}
              />
            ) : null}
            <FilmCards films={searchResults} />
          </>
        )}
      </div>
    );
  }
}

export default App;
