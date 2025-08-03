import { create } from 'zustand';

export type Item = {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
};

type State = {
  selectedItems: Item[];
  toggleItem: (item: Item) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
};

export const useSelectedItemsStore = create<State>((set, get) => ({
  selectedItems: [],
  toggleItem: (item) => {
    const exists = get().selectedItems.find((i) => i.id === item.id);
    set({
      selectedItems: exists
        ? get().selectedItems.filter((i) => i.id !== item.id)
        : [...get().selectedItems, item],
    });
  },
  clearAll: () => set({ selectedItems: [] }),
  isSelected: (id) => get().selectedItems.some((i) => i.id === id),
}));
