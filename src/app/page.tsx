import Dashboard from '../components/Dashboard';
import { Flyout } from '../components/Flyout';

export default function HomePage() {
  return (
    <div className="app-container">
      <Dashboard />
      <Flyout />
    </div>
  );
}
