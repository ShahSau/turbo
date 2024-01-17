import { create } from 'zustand';

interface SearchModalStore {
  isOpenR: boolean;
  onOpenR: () => void;
  onCloseR: () => void;
}

const useRepairSearchModal = create<SearchModalStore>((set) => (
  {
    isOpenR: false,
    onOpenR: () => set({ isOpenR: true }),
    onCloseR: () => set({ isOpenR: false }),
  }));

export default useRepairSearchModal;
