import { create } from 'zustand';

export type Item = {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
};

type Store = {
  selectedItems: Item[];
  selectItem: (item: Item) => void;
  unselectItem: (id: string) => void;
  isItemSelected: (id: string) => boolean;
  clearAll: () => void;
};

export const useSelectedItemsStore = create<Store>((set, get) => ({
  selectedItems: [],
  selectItem: (item) => {
    const { selectedItems } = get();
    if (!selectedItems.find((i) => i.id === item.id)) {
      set({ selectedItems: [...selectedItems, item] });
    }
  },
  unselectItem: (id) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    }));
  },
  isItemSelected: (id) => {
    return get().selectedItems.some((item) => item.id === id);
  },
  clearAll: () => set({ selectedItems: [] }),
}));
