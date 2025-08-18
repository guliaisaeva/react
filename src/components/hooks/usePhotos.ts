'use client';

import { useQuery } from '@tanstack/react-query';

export interface Photo {
  id: number;
  author: string;
  url: string;
  download_url: string;
}

export const usePhotos = () => {
  return useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      const res = await fetch('https://picsum.photos/v2/list', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch photos');

      const data = (await res.json()) as Photo[];

      return data.map((photo) => ({
        ...photo,
        url: `https://picsum.photos/id/${photo.id}/600/400`,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const usePhotoById = (id?: string) => {
  return useQuery<Photo>({
    queryKey: ['photo', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required');

      const res = await fetch('https://picsum.photos/v2/list', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch photos');

      const data = (await res.json()) as Photo[];
      const photo = data.find((p) => p.id === Number(id));

      if (!photo) throw new Error('Photo not found');

      return {
        ...photo,
        url: `https://picsum.photos/id/${photo.id}/600/400`,
      };
    },
    enabled: !!id,
  });
};
