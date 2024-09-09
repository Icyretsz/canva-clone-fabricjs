import {create} from 'zustand'
import {ActiveTool, PrimaryActiveTool, SecondaryActiveTool} from "@/features/editor/sidebar/types";
import {fabric} from "fabric";

interface MenuStore {
    isExpanded: boolean;
    setExpanded: (expanded: boolean) => void;
    activeTool: [PrimaryActiveTool, SecondaryActiveTool];
    setActiveTool: (primaryActiveTool : PrimaryActiveTool, secondaryActiveTool : SecondaryActiveTool) => void;
    clipboard: fabric.Object[] | undefined;
    setClipboard: (clipboard: fabric.Object[]) => void;
}

const useObjectStore = create<MenuStore>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({isExpanded: expanded}),
    activeTool: ["Select", ""],
    setActiveTool: (primaryActiveTool : PrimaryActiveTool, secondaryActiveTool : SecondaryActiveTool) => set({ activeTool: [primaryActiveTool, secondaryActiveTool] }),
    clipboard: [],
    setClipboard: (clipboard: fabric.Object[]) => set({clipboard: clipboard}),
}));

export default useObjectStore;
