import { create } from 'zustand'

interface MenuExpandContext {
    isExpanded: boolean;
    setExpanded: () => void;
}

const useMenuExpandStore = create<MenuExpandContext>((set) => ({
    isExpanded: false,
    setExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

export default useMenuExpandStore;
