import { Film } from '../components/types/types';

export async function fetchFilmData(searchQuery: string): Promise<Film[]> {
  try {
    const apiUrl = `https://swapi.dev/api/films/?search=${searchQuery}`;
    const response = await fetch(apiUrl);
    console.log(response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log(data);

    if (data.results && Array.isArray(data.results)) {
      return data.results as Film[];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
