import { create } from 'zustand';
import { fabric } from 'fabric';

interface ToolbarStore {
    currentObject: fabric.Object | null;
    setCurrentObject: (currentObject: fabric.Object | null) => void;
}

const useToolbarStore = create<ToolbarStore>((set) => ({
    currentObject: null,
    setCurrentObject: (currentObject) => set({ currentObject }),
}));

export default useToolbarStore;
