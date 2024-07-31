import {create} from 'zustand'
import {ActiveTool} from "@/features/editor/sidebar/types";

interface MenuStore {
    isExpanded: boolean;
    setExpanded: (expanded: boolean) => void;
    activeTool: ActiveTool;
    setActiveTool: (activeTool: ActiveTool) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({isExpanded: expanded}),
    activeTool: "Select",
    setActiveTool: (activeTool: ActiveTool) => set({activeTool}),
}));

export default useMenuStore;
