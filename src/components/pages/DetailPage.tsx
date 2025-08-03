import { useParams, useNavigate } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>Flower Detail</h2>
      <p style={{ fontSize: '18px' }}>
        This is detail for <strong>Flower {id}</strong>.
      </p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ← Back
      </button>
    </div>
  );
}
