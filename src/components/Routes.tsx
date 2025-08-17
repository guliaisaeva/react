import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailPage from './pages/DetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/details/:id" element={<DetailPage />} />
    </Routes>
  );
}
