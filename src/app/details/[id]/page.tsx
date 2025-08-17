'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePhotoById } from '../../../components/hooks/usePhotos';

interface Props {
  params: { id: string };
}

export default function DetailPage({ params }: Props) {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, isError } = usePhotoById(id);

  if (isLoading) return <p>Loading photo...</p>;
  if (isError || !data) return <p>Failed to load photo details.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{data.title}</h2>
      <Image src={data.url} alt={data.title} width={400} height={400} />
      <p style={{ fontSize: '18px' }}>
        This is detail for <strong>{id}</strong>.
      </p>

      <button
        onClick={() => router.back()}
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
