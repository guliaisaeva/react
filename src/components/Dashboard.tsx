'use client';

import { useRouter } from 'next/navigation';
import { useSelectedItemsStore } from '../stores/selectedItemsStore';
import Image from 'next/image';
import { usePhotos } from './hooks/usePhotos';

export default function Dashboard() {
  const { toggleItem, isSelected } = useSelectedItemsStore();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = usePhotos();

  if (isLoading) return <p>Loading photos...</p>;
  if (isError) return <p>Failed to load photos. Try again later.</p>;

  return (
    <div className="dashboard">
      <button onClick={() => refetch()}>🔄 Refresh</button>

      {data?.slice(0, 20).map((item) => (
        <div
          key={item.id}
          className={`card ${isSelected(item.id.toString()) ? 'selected' : ''}`}
          onClick={() => router.push(`/details/${item.id}`)}
        >
          <input
            type="checkbox"
            aria-label={`Select ${item.title}`}
            checked={isSelected(item.id.toString())}
            onClick={(e) => e.stopPropagation()}
            onChange={() =>
              toggleItem({
                id: item.id.toString(),
                name: item.title,
                description: item.url,
                detailsUrl: `/details/${item.id}`,
              })
            }
          />
          <div className="text-container">
            <Image src={item.url} alt={item.title} width={200} height={200} />
            <h3 className="title">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
