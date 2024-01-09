import { create } from 'zustand';

interface EquipmentModalStore {
  isOpenE: boolean;
  onOpenE: () => void;
  onCloseE: () => void;
}

const useEquipmentModal = create<EquipmentModalStore>((set) => ({
  isOpenE: false,
  onOpenE: () => set({ isOpenE: true }),
  onCloseE: () => set({ isOpenE: false }),
}));

export default useEquipmentModal;
