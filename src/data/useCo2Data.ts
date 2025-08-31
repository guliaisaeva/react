
let dataPromise: Promise<unknown> | null = null;
let dataCache: unknown = null;

function fetchCo2Data() {
  if (!dataPromise) {
    dataPromise = fetch('/path/to/co2-data.json')
      .then((res) => res.json())
      .then((data) => {
        dataCache = data;
        return data;
      });
  }
  if (dataCache) return dataCache;
  throw dataPromise;
}

export function useCo2Data() {
  return fetchCo2Data();
}
