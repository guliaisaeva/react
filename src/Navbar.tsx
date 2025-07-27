import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        marginBottom: '1rem',
      }}
    >
      <Link
        to="/"
        style={{ marginRight: 16, textDecoration: 'none', color: 'blue' }}
      >
        Home
      </Link>
      <Link to="/about" style={{ textDecoration: 'none', color: 'blue' }}>
        About
      </Link>
    </nav>
  );
};

export default Navbar;
