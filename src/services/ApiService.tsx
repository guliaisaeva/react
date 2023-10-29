import { Film } from '../components/types/types';

export async function fetchFilmData(searchQuery: string): Promise<Film[]> {
  try {
    const apiUrl = `https://swapi.dev/api/films/?search=${searchQuery}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
