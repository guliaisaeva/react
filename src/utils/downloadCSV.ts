import { Item } from '../stores/selectedItemsStore';

export const downloadCSV = (items: Item[]) => {
  const headers = 'ID,Name,Description,Details URL\n';
  const rows = items
    .map((i) => `${i.id},${i.name},${i.description},${i.detailsUrl}`)
    .join('\n');
  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${items.length}_items.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
