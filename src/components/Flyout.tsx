'use client';

import { useSelectedItemsStore } from '../stores/selectedItemsStore';
import { downloadCSV } from '../utils/downloadCSV';

export function Flyout() {
  const { selectedItems, clearAll } = useSelectedItemsStore();

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout-container fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-2xl flex items-center gap-4">
      <span className="flyout-text text-sm font-medium">
        {selectedItems.length} Flower{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>

      <div className="flyout-buttons flex gap-2">
        <button
          onClick={clearAll}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
        >
          Unselect All
        </button>
        <button
          onClick={() => downloadCSV(selectedItems)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
