import { create } from 'zustand';

export type Item = {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
};

type SelectedItemsState = {
  selectedItems: Item[];
  toggleItem: (item: Item) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
};

export const useSelectedItemsStore = create<SelectedItemsState>((set, get) => ({
  selectedItems: [],
  toggleItem: (item) => {
    const { selectedItems } = get();
    console.log(selectedItems);
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      set({ selectedItems: selectedItems.filter((i) => i.id !== item.id) });
    } else {
      set({ selectedItems: [...selectedItems, item] });
    }
  },
  clearAll: () => set({ selectedItems: [] }),
  isSelected: (id) => get().selectedItems.some((i) => i.id === id),
}));
