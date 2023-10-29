import { Component } from 'react';
import SearchForm from './components/SearchForm';
import FilmCards from './components/FilmCards';
import { fetchFilmData } from './services/ApiService';
import { Film } from './components/types/types';
import ResultsComponent from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';

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
      loading: true,
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
        searchTerm: '',
        searchResults: films,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching all films:', error);
      this.setState({
        loading: false,
        error: error as Error,
      });
    }
  };

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);

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
      <ErrorBoundary>
        <div>
          <h1>Star Wars Films</h1>
          <SearchForm
            searchTerm={this.state.searchTerm}
            onSearch={this.handleSearch}
          />

          {loading ? (
            <p className="loading">Loading... Your adventure begins shortly!</p>
          ) : (
            <div>
              {searchTerm ? (
                <div>
                  {searchResults.length > 0 ? (
                    <>
                      <ResultsComponent
                        results={searchResults.map((film) => ({
                          name: film.title,
                          description: film.opening_crawl,
                        }))}
                      />
                      <FilmCards films={searchResults} />
                    </>
                  ) : (
                    <p className="not-found">Not Found</p>
                  )}
                </div>
              ) : (
                <FilmCards films={searchResults} />
              )}
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
