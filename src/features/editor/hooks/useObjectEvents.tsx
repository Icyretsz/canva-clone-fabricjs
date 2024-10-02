import {useCallback, useEffect, useRef} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"
import {flushSync} from "react-dom";
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";

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
                             selectedObjects,
                             setSelectedObjects,
                             historyUndo,
                             historyRedo,
                             setHistoryUndo,
                             setHistoryRedo
                         }: UseCanvasEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()
    const HISTORY_LIMIT = 10
    const localSelectedObjectsRef = useRef<fabric.Object | null>(null);
    const {getCanvasThumbnail} = useCanvasThumbnail()

    const saveHistory = useCallback(() => {
        if (!canvas) return;

        const state = JSON.stringify(canvas.toJSON(['selectable', 'hasControls', 'evented', 'hoverCursor', 'name']));
        setHistoryUndo((prevState) => {
            let historyUndoClone = [...prevState];
            if (historyUndoClone.length === HISTORY_LIMIT) {
                historyUndoClone.shift();
            }
            return [...historyUndoClone, state];
        });
        setHistoryRedo([]);
    }, [canvas, setHistoryRedo, setHistoryUndo]);

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (e) => {
                setSelectedObjects(e.selected || [])

            })
            canvas.on('selection:updated', (e) => {
                setSelectedObjects(e.selected || [])
            })
            canvas.on('before:selection:cleared', () => {
                if (canvas.getActiveObject && activeTool[1] !== "") {
                    flushSync(() => {
                        localSelectedObjectsRef.current = canvas.getActiveObject();
                    });
                }
            })
            canvas.on('selection:cleared', () => {
                if (activeTool[1] !== "") {
                    setActiveTool(activeTool[0], "")
                    if (activeTool[0] === "Select") {
                        setExpanded(false)
                    }
                    if (localSelectedObjectsRef.current !== null) {
                        canvas.setActiveObject(localSelectedObjectsRef.current);
                        localSelectedObjectsRef.current = null
                        canvas.renderAll();
                    }
                } else if (activeTool[1] === "") {
                    canvas.discardActiveObject()
                    setSelectedObjects([])
                }
            })
            canvas.on('object:modified', (event) => {
                saveHistory()
                getCanvasThumbnail()
            });

            canvas.on('text:changed', (event) => {
                saveHistory()
            })
        }
        return () => {
            if (canvas) {
                canvas.off()
            }
        }
    }, [canvas, activeTool, setActiveTool, setExpanded, setSelectedObjects, historyRedo, historyUndo, saveHistory])
};

export default useCanvasEvents;