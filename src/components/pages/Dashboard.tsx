import { useSelectedItemsStore } from '../../stores/selectedItemsStore';

const mockItems = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  name: `Item ${i + 1}`,
  description: `Description ${i + 1}`,
  detailsUrl: `/details/${i + 1}`,
}));

export default function Dashboard() {
  const { toggleItem, isSelected } = useSelectedItemsStore();

  return (
    <div className="p-4">
      {mockItems.map((item) => (
        <div key={item.id} className="flex gap-2">
          <input
            type="checkbox"
            checked={isSelected(item.id)}
            onChange={() => toggleItem(item)}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
