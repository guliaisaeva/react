import { useSelectedItemsStore } from '../stores/selectedItemsStore';
import { downloadCSV } from '../utils/downloadCSV';

export function Flyout() {
  const { selectedItems, clearAll } = useSelectedItemsStore();

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between">
      <span>{selectedItems.length} items selected</span>
      <div className="flex gap-2">
        <button onClick={clearAll}>Unselect All</button>
        <button onClick={() => downloadCSV(selectedItems)}>Download</button>
      </div>
    </div>
  );
}
