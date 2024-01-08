import { create } from 'zustand';

interface RepairModalStore {
  isOpenRe: boolean;
  onOpenRe: () => void;
  onCloseRe: () => void;
}

const useRepairModal = create<RepairModalStore>((set) => ({
  isOpenRe: false,
  onOpenRe: () => set({ isOpenRe: true }),
  onCloseRe: () => set({ isOpenRe: false }),
}));

export default useRepairModal;
