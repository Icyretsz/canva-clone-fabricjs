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
    currentPageHistory: number[],
    setCurrentPageHistory: React.Dispatch<React.SetStateAction<number[]>>,
}

const useCanvasEvents = ({
                             canvas,
                             selectedObjects,
                             setSelectedObjects,
                             historyUndo,
                             historyRedo,
                             setHistoryUndo,
                             setHistoryRedo,
                             currentPageHistory,
                             setCurrentPageHistory
                         }: UseCanvasEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()
    const HISTORY_LIMIT = 10
    const localSelectedObjectsRef = useRef<fabric.Object | null>(null);
    const {getCanvasThumbnail} = useCanvasThumbnail()


    const saveHistory = useCallback((object?: fabric.Object) => {
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
        setCurrentPageHistory(prev => [...prev, Number(object?.name)])
    }, [canvas, setHistoryRedo, setHistoryUndo]);

    useEffect(() => {
        console.log(currentPageHistory)
    }, [currentPageHistory])

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
                const lastObject = canvas.getObjects()[canvas.getObjects().length - 1]
                const currentActiveObjects = canvas.getActiveObjects()[canvas.getActiveObjects().length - 1]
                if (currentActiveObjects)
                    saveHistory(currentActiveObjects)
                else
                    saveHistory(lastObject)
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