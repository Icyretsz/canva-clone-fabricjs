import {useEffect} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"


interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
    historyUndo: fabric.Object[][],
    setHistoryUndo: React.Dispatch<React.SetStateAction<fabric.Object[][]>>;
    historyRedo: fabric.Object[][],
    setHistoryRedo: React.Dispatch<React.SetStateAction<fabric.Object[][]>>;
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
                console.log('changed')
                const currentObjects: fabric.Object[] = []
                canvas.getObjects().map((object: fabric.Object) => {
                    object.clone(function (cloned: fabric.Object) {
                        if (object.name === 'clip') return
                        currentObjects.push(cloned)
                    })
                })
                setHistoryUndo((prevHistory: fabric.Object[][]) => {
                    const newHistoryUndo = [...prevHistory, currentObjects];
                    if (newHistoryUndo.length > 3) {
                        newHistoryUndo.shift();
                    }
                    return newHistoryUndo;
                });
                setHistoryRedo([]);
            });
            canvas.on('object:added', () => {
                console.log('added')
                const currentObjects: fabric.Object[] = []
                canvas.getObjects().map((object: fabric.Object) => {
                    object.clone(function (cloned: fabric.Object) {
                        if (object.name === 'clip') return
                        currentObjects.push(cloned)
                    })
                })
                setHistoryUndo((prevHistory: fabric.Object[][]) => {
                    const newHistoryUndo = [...prevHistory, currentObjects];
                    if (newHistoryUndo.length > 3) {
                        newHistoryUndo.shift();
                    }
                    return newHistoryUndo;
                });
                setHistoryRedo([]);
            });
            canvas.on('object:removed', () => {
                console.log('removed')
                const currentObjects: fabric.Object[] = []
                canvas.getObjects().map((object: fabric.Object) => {
                    object.clone(function (cloned: fabric.Object) {
                        if (object.name === 'clip') return
                        currentObjects.push(cloned)
                    })
                })
                setHistoryUndo((prevHistory: fabric.Object[][]) => {
                    const newHistoryUndo = [...prevHistory, currentObjects];
                    if (newHistoryUndo.length > 10) {
                        newHistoryUndo.shift();
                    }
                    return newHistoryUndo;
                });
                setHistoryRedo([]);
            });
        }
        return () => {
            if (canvas) {
                canvas.off()
            }
        }
    }, [canvas, activeTool, setActiveTool, setExpanded, setSelectedObjects, setHistoryUndo, setHistoryRedo, historyRedo, historyUndo])
};

export default useCanvasEvents;