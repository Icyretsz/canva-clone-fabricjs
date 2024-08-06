import {useEffect} from 'react';
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
                             historyUndo, historyRedo, setHistoryUndo, setHistoryRedo
                         }: UseCanvasEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()

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
                const state = JSON.stringify(canvas)
                setHistoryUndo((prevState) => {
                    let historyUndoClone = [...prevState]
                        if (historyUndoClone.length === 5) {
                            historyUndoClone.shift()
                        }
                    return [...historyUndoClone, state]
                })
                setHistoryRedo([])
                console.log(historyUndo)
            });
            canvas.on('object:added', () => {
                const state = JSON.stringify(canvas)
                setHistoryUndo((prevState) => {
                    let historyUndoClone = [...prevState]
                    if (historyUndoClone.length === 5) {
                        historyUndoClone.shift()
                    }
                    return [...historyUndoClone, state]
                })
                setHistoryRedo([])
            });
            canvas.on('object:removed', () => {
                const state = JSON.stringify(canvas)
                setHistoryUndo((prevState) => {
                    let historyUndoClone = [...prevState]
                    if (historyUndoClone.length === 5) {
                        historyUndoClone.shift()
                    }
                    return [...historyUndoClone, state]
                })
                setHistoryRedo([])
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