import {useCallback, useEffect} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"


interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
    historyUndo: string[],
    setHistoryUndo: React.Dispatch<React.SetStateAction<string[]>>;
    historyRedo: string[],
    setHistoryRedo: React.Dispatch<React.SetStateAction<string[]>>;
}

const useCanvasEvents = ({
                             canvas,
                             setSelectedObjects,
                             historyUndo,
                             historyRedo,
                             setHistoryUndo,
                             setHistoryRedo
                         }: UseCanvasEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()
    const HISTORY_LIMIT = 10

    const saveHistory = useCallback(() => {
        if (!canvas) return;

        const state = JSON.stringify(canvas.toJSON(['selectable', 'hasControls', 'hoverCursor', 'name']));
        setHistoryUndo((prevState) => {
            let historyUndoClone = [...prevState];
            if (historyUndoClone.length === HISTORY_LIMIT) {
                historyUndoClone.shift();
            }
            return [...historyUndoClone, state];
        });
        setHistoryRedo([]);
    }, [canvas, historyUndo]);

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (e) => {
                setSelectedObjects(e.selected || [])

            })
            canvas.on('selection:updated', (e) => {
                setSelectedObjects(e.selected || [])
            })
            canvas.on('selection:cleared', () => {
                setSelectedObjects([])
                if (activeTool !== "Shapes" && activeTool !== "Text" && activeTool !== "Upload") {
                    setActiveTool("")
                    setExpanded(false)
                }
            })
            canvas.on('object:modified', () => {
                saveHistory()
            });
        }
        return () => {
            if (canvas) {
                canvas.off()
            }
        }
    }, [canvas, activeTool, setActiveTool, setExpanded, setSelectedObjects, historyRedo, historyUndo])
};

export default useCanvasEvents;