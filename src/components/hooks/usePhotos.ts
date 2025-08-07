import { useQuery } from '@tanstack/react-query';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const usePhotos = () => {
  return useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/photos');
      if (!res.ok) throw new Error('Failed to fetch photos');
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const usePhotoById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['photo', id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      if (!res.ok) throw new Error('Failed to fetch photo');
      return res.json();
    },
    enabled: !!id,
  });
};
