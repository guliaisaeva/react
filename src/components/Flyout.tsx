import { useSelectedItemsStore } from '../stores/selectedItemsStore';
import { downloadCSV } from '../utils/downloadCSV';

export function Flyout() {
  const { selectedItems, clearAll } = useSelectedItemsStore();

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout-container">
      <span className="flyout-text">{selectedItems.length} </span>
      <span>item{selectedItems.length > 1 ? 's' : ''} selected</span>
      <div className="flyout-buttons">
        <button onClick={clearAll}>Unselect All</button>
        <button onClick={() => downloadCSV(selectedItems)}>Download</button>
      </div>
    </div>
  );
}
