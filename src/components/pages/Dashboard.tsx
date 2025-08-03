import { useNavigate } from 'react-router-dom';
import { useSelectedItemsStore } from '../../stores/selectedItemsStore';

const mockItems = [...Array(12)].map((_, i) => ({
  id: i.toString(),
  name: `Flower ${i + 1}`,
  description: `Description ${i + 1}`,
  detailsUrl: `/details/${i + 1}`,
}));

export default function Dashboard() {
  const { toggleItem, isSelected } = useSelectedItemsStore();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {mockItems.map((item) => (
        <div
          key={item.id}
          className={`card ${isSelected(item.id) ? 'selected' : ''}`}
          onClick={() => navigate(item.detailsUrl)}
        >
          <input
            type="checkbox"
            aria-label={`Select ${item.name}`}
            checked={isSelected(item.id)}
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleItem(item)}
          />
          <div className="text-container">
            <h3 className="title">{item.name}</h3>
            <p className="description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
