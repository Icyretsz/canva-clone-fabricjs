import React, {useEffect} from 'react';
import {fabric} from "fabric";

interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null,
    selectedObjects: fabric.Object[],
    setSelectedObjects: (selectedObject: fabric.Object[]) => void,
}

const useCanvasEvents = ({
                             canvas,
                             selectedObjects,
                             setSelectedObjects
                         }: UseCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (e) => {
                setSelectedObjects(e.selected || [])
            })
            canvas.on('selection:updated', (e) => {
                setSelectedObjects(e.selected || [])
            })
            canvas.on('selection:cleared', () => {
                setSelectedObjects( [])
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