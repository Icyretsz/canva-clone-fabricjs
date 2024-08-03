import {useEffect} from 'react';
import {fabric} from "fabric";
import useObjectStore from "@/features/editor/stores/store"

interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
}

const useCanvasEvents = ({
                             canvas,
                             setSelectedObjects
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
        }
        return () => {
            if (canvas) {
                canvas.off('selection:created')
                canvas.off('selection:updated')
                canvas.off('selection:cleared')
            }
        }
    }, [canvas])
};

export default useCanvasEvents;