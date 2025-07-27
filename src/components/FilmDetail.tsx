// src/components/FilmDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFilmData } from '../services/ApiService';
import { Film } from './types/types';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const allFilms = await fetchFilmData('');
        const selected = allFilms.find((f) => f.episode_id.toString() === id);
        if (selected) {
          setFilm(selected);
        } else {
          setError(new Error('Film not found'));
        }
      } catch (err) {
        setError(err as Error);
      }
    };
    load();
  }, [id]);

  if (error) return <p>Error: {error.message}</p>;
  if (!film) return <p>Loading...</p>;

  return (
    <div className="detail p-6 max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="btn text-red-500 mb-4">
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{film.title}</h2>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>
        <strong>Producer:</strong> {film.producer}
      </p>
      <p>
        <strong>Release Date:</strong> {film.release_date}
      </p>
      <p className="mt-4 whitespace-pre-wrap">{film.opening_crawl}</p>
    </div>
  );
};

export default FilmDetail;
