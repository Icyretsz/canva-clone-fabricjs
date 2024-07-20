import { create } from 'zustand'

interface MenuExpandContext {
    isExpanded: boolean;
    setExpanded: (expanded : boolean) => void;
    activeButton: string;
    setActiveButton: (activeButton : string) => void;
}

const useMenuExpandStore = create<MenuExpandContext>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({ isExpanded: expanded }),
    activeButton: '',
    setActiveButton: (buttonId : string) => set({ activeButton : buttonId }),
}));

export default useMenuExpandStore;
