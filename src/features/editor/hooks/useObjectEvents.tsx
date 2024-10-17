import {useCallback, useEffect, useRef} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"
import {flushSync} from "react-dom";
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";
import {Editor} from "@/features/editor/sidebar/types";

interface UseObjectEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
    historyUndo: string[],
    setHistoryUndo: React.Dispatch<React.SetStateAction<string[]>>;
    historyRedo: string[],
    setHistoryRedo: React.Dispatch<React.SetStateAction<string[]>>;
    pageContainer: number[],
    pageThumbnails: string[],
    setPageThumbnails: React.Dispatch<React.SetStateAction<string[]>>,
    editor: Editor | undefined
}

const useObjectEvents = ({
                             canvas,
                             setSelectedObjects,
                             historyUndo,
                             historyRedo,
                             setHistoryUndo,
                             setHistoryRedo,
                             editor
                         }: UseObjectEventsProps) => {

    const {activeTool, setActiveTool, setExpanded} = useObjectStore()
    const HISTORY_LIMIT = 50
    const localSelectedObjectsRef = useRef<fabric.Object | null>(null);
    const {getCanvasThumbnail} = useCanvasThumbnail({editor})


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
            canvas.on('object:modified', (event : fabric.IEvent) => {
                let page : number | undefined
                if (event) { //reason for ts-ignore: TS don't recognize event.name, event array and _object even though they are certainly there.
                    // @ts-ignore
                    if (event.name) {
                    // @ts-ignore
                        page = event.name
                    // @ts-ignore
                    } else if (event[0] && event[0].name) {
                    // @ts-ignore
                        page = event[0].name
                    // @ts-ignore
                    } else if (event.target && event.target._objects && event.target._objects[0]) {
                    // @ts-ignore
                        page = event.target._objects[0].name
                    } else if (event.target && event.target.name) {
                        page = Number(event.target.name)
                    } else {
                        page = undefined
                    }
                } else {
                    page = undefined
                }
                getCanvasThumbnail({page : Number(page)})
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