import {useCallback, useEffect, useState} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"
import {flushSync} from "react-dom";


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
    const [localSelectedObjects, setLocalSelectedObjects] = useState<fabric.Object | null>(null)

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
                if (selectedObjects.length > 0) {
                    flushSync(() => {
                        setLocalSelectedObjects(canvas.getActiveObject())
                    });

                }
            })
            canvas.on('selection:cleared', () => {
                console.log(localSelectedObjects)
                if (activeTool[1] !== "") {
                    setActiveTool(activeTool[0], "")
                    if (activeTool[0] === "Select") {
                        setExpanded(false)
                    }
                    if (localSelectedObjects !== null) {
                        canvas.setActiveObject(localSelectedObjects)
                    }
                } else if (activeTool[1] === "") {
                    setSelectedObjects([])
                    setLocalSelectedObjects(null)
                }
            })
            canvas.on('object:modified', (event) => {
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
    }, [canvas, activeTool, setActiveTool, setExpanded, setSelectedObjects, historyRedo, historyUndo, saveHistory, localSelectedObjects])
};

export default useCanvasEvents;