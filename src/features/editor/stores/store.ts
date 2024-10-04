import {create} from 'zustand'
import {PrimaryActiveTool, SecondaryActiveTool} from "@/features/editor/sidebar/types";
import {fabric} from "fabric";

interface MenuStore {
    isExpanded: boolean;
    setExpanded: (expanded: boolean) => void;
    activeTool: [PrimaryActiveTool, SecondaryActiveTool];
    setActiveTool: (primaryActiveTool : PrimaryActiveTool, secondaryActiveTool : SecondaryActiveTool) => void;
    clipboard: fabric.Object[] | undefined;
    setClipboard: (clipboard: fabric.Object[]) => void;
    canvasThumbnails: string[];
    setCanvasThumbnails: (canvasThumbnails: string[]) => void;
    originalWorkspaceDimension: [number, number];
    setOriginalWorkspaceDimension: (originalWorkspaceDimension: [number, number]) => void;
}

const useObjectStore = create<MenuStore>((set) => ({
    isExpanded: false,
    setExpanded: (expanded) => set({isExpanded: expanded}),
    activeTool: ["Select", ""],
    setActiveTool: (primaryActiveTool : PrimaryActiveTool, secondaryActiveTool : SecondaryActiveTool) => set({ activeTool: [primaryActiveTool, secondaryActiveTool] }),
    clipboard: [],
    setClipboard: (clipboard: fabric.Object[]) => set({clipboard: clipboard}),
    canvasThumbnails: [],
    setCanvasThumbnails: (canvasThumbnails: string[]) => set({canvasThumbnails: canvasThumbnails}),
    originalWorkspaceDimension: [0, 0],
    setOriginalWorkspaceDimension: (originalWorkspaceDimension: [number, number]) => set({originalWorkspaceDimension: originalWorkspaceDimension}),
}));

export default useObjectStore;
