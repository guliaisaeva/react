import { Component } from 'react';
import SearchForm from './components/SearchForm';
import FilmCards from './components/FilmCards';
import { fetchFilmData } from './services/ApiService';
import { Film } from './components/types/types';
import ResultsComponent from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

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
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.search(trimmedTerm);
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

  throwError = () => {
    throw new Error('This is a test error triggered by the user.');
  };

  render() {
    const { searchResults, searchTerm, loading, error } = this.state;
    if (error) {
      return (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Star Wars Films</h1>
          <div role="alert" style={{ color: 'red' }}>
            <h2>Error:</h2>
            <p>{error.message}</p>
          </div>
        </div>
      );
    }
    return (
      <ErrorBoundary>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Star Wars Films</h1>

          <div className="mb-8">
            <SearchForm
              searchTerm={this.state.searchTerm}
              onSearch={this.handleSearch}
            />
          </div>

          <div>
            {loading ? (
              <p className="loading">
                Loading... Your adventure begins shortly!
              </p>
            ) : searchTerm ? (
              searchResults.length > 0 ? (
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
              )
            ) : (
              <FilmCards films={searchResults} />
            )}
          </div>

          <button className="error-btn" onClick={this.throwError}>
            Trigger Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
