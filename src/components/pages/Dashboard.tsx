import { Item, useSelectedItemsStore } from '../../stores/selectedItemsStore';

const items: Item[] = [
  {
    id: '1',
    name: 'Item 1',
    description: 'Description 1',
    detailsUrl: '/details/1',
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Description 2',
    detailsUrl: '/details/2',
  },
];

export default function Dashboard() {
  const { toggleItem, isSelected } = useSelectedItemsStore();

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={() => toggleItem(item)}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
