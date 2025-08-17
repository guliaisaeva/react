import { Flyout } from '../components/Flyout';
import Dashboard from '../components/Dashboard';

export default function HomePage() {
  return (
    <div className="app-container">
      <Dashboard />
      <Flyout />
    </div>
  );
}
