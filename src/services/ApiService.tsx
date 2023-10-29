export async function fetchFilmData(searchQuery: string): Promise<any> {
  try {
    // Modify the URL to include the search query
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
