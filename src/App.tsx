import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';

const App: React.FC = () => {
  return <HomePage />;

  <Router>
    <Route path="/" element={<HomePage />} />
    {/* <Route path="/film/:id" element={FilmDetails} /> */}
  </Router>;
};

export default App;
