import {useCallback, useMemo, useState} from 'react'
import {fabric} from 'fabric'
import useAutoResize from "@/features/editor/hooks/useAutoResize";

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)

    useAutoResize({canvas, container})

    const addShapes = (canvas : fabric.Canvas) => {
        return {
            addRect: () => {
                const rect = new fabric.Rect({
                    width: 140,
                    height: 120,
                    fill: '#000'
                })
                canvas.add(rect)
                canvas.centerObject(rect)
                canvas.setActiveObject(rect)
            },
            addCircle: () => {
                const circle = new fabric.Circle({
                    radius: 60,
                    fill: '#000',
                    stroke: '#000',
                })
                canvas.add(circle)
                canvas.centerObject(circle)
                canvas.setActiveObject(circle)
            },
            addTriangle: () => {
                const triangle = new fabric.Triangle({
                    width: 120,
                    height: 120,
                    fill: '#000',
                    stroke: '#000',
                })
                canvas.add(triangle)
                canvas.centerObject(triangle)
                canvas.setActiveObject(triangle)
            },
            addPolygon: () => {
                const polygon = new fabric.Polygon([
                    { x: 20, y: 52.73 },      // Top edge midpoint right vertex
                    { x: 37.29, y: 37.29 },   // Top-right vertex
                    { x: 52.73, y: 20 },      // Right-top vertex
                    { x: 52.73, y: -20 },     // Right-bottom vertex
                    { x: 37.29, y: -37.29 },  // Bottom-right vertex
                    { x: 20, y: -52.73 },     // Bottom edge midpoint right vertex
                    { x: -20, y: -52.73 },    // Bottom edge midpoint left vertex
                    { x: -37.29, y: -37.29 }, // Bottom-left vertex
                    { x: -52.73, y: -20 },    // Left-bottom vertex
                    { x: -52.73, y: 20 },     // Left-top vertex
                    { x: -37.29, y: 37.29 },  // Top-left vertex
                    { x: -20, y: 52.73 }
                ], {
                    fill: '#000',
                    stroke: '#000',
                });
                canvas.add(polygon)
                canvas.centerObject(polygon)
                canvas.setActiveObject(polygon)
            }
        }
    }

    const editor = useMemo(() => {
        if (canvas) {
            return addShapes(canvas)
        }
        return undefined
    }, [canvas])

    const init = useCallback((
        {
            initialCanvas,
            initialContainer
        }:
            {
                initialCanvas: fabric.Canvas;
                initialContainer: HTMLDivElement;
            }
    ) => {


        fabric.Object.prototype.set({
            cornerColor: "#fff",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6"
        })
        const initialWorkspace = new fabric.Rect({
            width : 1200,
            height : 900,
            name : 'clip',
            fill : 'white',
            selectable : false,
            hasControls : false,
            hoverCursor: 'default',
            shadow: new fabric.Shadow(
                {
                    color: 'rgba(0, 0, 0, 0.8)',
                    blur: 5
                }
            )
        })

        initialCanvas.setWidth(
            initialContainer.offsetWidth
        )
        initialCanvas.setHeight(
            initialContainer.offsetHeight
        )


        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace

        setCanvas(initialCanvas)
        setContainer(initialContainer)


    }, [])

    return {init, editor}
};

