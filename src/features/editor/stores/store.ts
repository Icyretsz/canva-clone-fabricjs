import {create} from 'zustand'
import {ActiveTool} from "@/features/editor/sidebar/types";
import {fabric} from "fabric";

interface MenuStore {
    isExpanded: boolean;
    setExpanded: (expanded: boolean) => void;
    activeTool: ActiveTool;
    setActiveTool: (activeTool: ActiveTool) => void;
    clipboard: fabric.Object[] | undefined;
    setClipboard: (clipboard: fabric.Object[]) => void;
}

const useObjectStore = create<MenuStore>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({isExpanded: expanded}),
    activeTool: "Select",
    setActiveTool: (activeTool: ActiveTool) => set({activeTool}),
    clipboard: [],
    setClipboard: (clipboard: fabric.Object[]) => set({clipboard: clipboard}),
}));

export default useObjectStore;
