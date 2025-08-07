import { useParams, useNavigate } from 'react-router-dom';
import { usePhotoById } from '../hooks/usePhotos';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePhotoById(id);

  if (isLoading) return <p>Loading photo...</p>;
  if (isError) return <p>Failed to load photo details.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{data.title}</h2>
      <p style={{ fontSize: '18px' }}>
        This is detail for <strong>Photo {id}</strong>.
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
