import {create} from 'zustand'
import {ActiveTool} from "@/features/editor/sidebar/types";
import {fabric} from 'fabric'

interface MenuStore {
    isExpanded: boolean;
    setExpanded: (expanded: boolean) => void;
    activeTool: ActiveTool;
    setActiveTool: (activeTool: ActiveTool) => void;
    currentObject: fabric.Object | null;
    setCurrentObject: (currentObject: fabric.Object | null) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({isExpanded: expanded}),
    activeTool: 'Select',
    setActiveTool: (activeTool: ActiveTool) => set({activeTool}),
    currentObject: null,
    setCurrentObject: (currentObject) => set({ currentObject }),
}));

export default useMenuStore;
