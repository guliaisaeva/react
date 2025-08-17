import Image from 'next/image';
import Link from 'next/link';
import { Photo } from '../../../components/hooks/usePhotos';

interface Props {
  params: { id: string };
}

async function getPhotoById(id: string): Promise<Photo | null> {
  const res = await fetch('https://picsum.photos/v2/list', {
    cache: 'force-cache',
  });
  const photos = (await res.json()) as Photo[];
  const photo = photos.find((p) => p.id === Number(id));
  if (!photo) return null;
  return { ...photo, url: `https://picsum.photos/id/${photo.id}/600/400` };
}

export default async function DetailPage({ params }: Props) {
  const photo = await getPhotoById(params.id);

  if (!photo) return <p>Failed to load photo details.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{photo.author}</h2>
      <Image src={photo.url} alt={photo.author} width={600} height={400} />
      <p>
        This is detail for <strong>{params.id}</strong>
      </p>
      <Link href="/">← Back</Link>
    </div>
  );
}
