import {useCallback, useEffect, useRef} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"
import {flushSync} from "react-dom";
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";

interface UseObjectEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
    historyUndo: string[],
    setHistoryUndo: React.Dispatch<React.SetStateAction<string[]>>;
    historyRedo: string[],
    setHistoryRedo: React.Dispatch<React.SetStateAction<string[]>>;
    pageContainer: number[],
}

const useObjectEvents = ({
                             canvas,
                             selectedObjects,
                             setSelectedObjects,
                             historyUndo,
                             historyRedo,
                             setHistoryUndo,
                             setHistoryRedo,
                             pageContainer,
                         }: UseObjectEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()
    const HISTORY_LIMIT = 50
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
        console.log('history saved')
    }, [canvas, setHistoryRedo, setHistoryUndo]);

    useEffect(() => {
        saveHistory()
    }, [canvas, saveHistory])

    useEffect(() => {
        saveHistory()
    }, []) //this is for initialize the initial state of the canvas after the canvas initial render

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
                        // canvas.setActiveObject(localSelectedObjectsRef.current);
                        // localSelectedObjectsRef.current = null
                        // canvas.renderAll();
                    }
                } else if (activeTool[1] === "") {
                    canvas.discardActiveObject()
                    setSelectedObjects([])
                }
            })
            canvas.on('object:modified', (event) => {
                getCanvasThumbnail({canvas, pageContainer})
                saveHistory()
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

export default useObjectEvents;