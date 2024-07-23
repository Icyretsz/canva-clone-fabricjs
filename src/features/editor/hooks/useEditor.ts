import {useCallback, useMemo, useState} from 'react'
import {fabric} from 'fabric'
import useAutoResize from "@/features/editor/hooks/useAutoResize";
import useToolbarStore from "@/features/editor/toolbar/stores/toolbar-store"
import useMenuStore from "@/features/editor/sidebar/stores/sidebar-store";
import {
    FILL_COLOR,
    STROKE_COLOR,
    STROKE_WIDTH,
    RECTANGLE_OPTIONS,
    TRIANGLE_OPTIONS,
    CIRCLE_OPTIONS,
    OCTAGON_POINTS,
    OCTAGON_OPTIONS
} from "@/features/editor/sidebar/types";

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const {setCurrentObject} = useToolbarStore()
    const {setActiveTool} = useMenuStore()
    


    useAutoResize({canvas, container})


    const addShapes = (canvas: fabric.Canvas) => {

        const getWorkspace = () => {
            return canvas
                .getObjects()
                .find((object) => object.name === "clip")
        }

        const center = (object: fabric.Object) => {
            const workspace = getWorkspace()
            const center = workspace?.getCenterPoint()

            if (!center) return

            //@ts-ignore
            canvas._centerObject(object, center)
        }

        const addProc = (object: fabric.Object) => {
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
            canvas.renderAll();
        }

        return {
            addRect: () => {
                const rect = new fabric.Rect({
                    ...RECTANGLE_OPTIONS
                })
                addProc(rect)
                rect.on('selected', () => {
                    setCurrentObject(rect)
                });
                rect.on("deselected", () => {
                    setCurrentObject(null)
                    setActiveTool('Shapes')
                })
            },
            addCircle: () => {
                const circle = new fabric.Circle({
                    ...CIRCLE_OPTIONS
                })
                addProc(circle)
                circle.on('selected', (e) => {
                    setCurrentObject(circle)
                });
                circle.on("deselected", () => {
                    setCurrentObject(null)
                    setActiveTool('Shapes')
                })
            },
            addTriangle: () => {
                const triangle = new fabric.Triangle({
                    ...TRIANGLE_OPTIONS
                })
                addProc(triangle)
                triangle.on('selected', (e) => {
                    setCurrentObject(triangle)
                });
                triangle.on("deselected", () => {
                    setCurrentObject(null)
                    setActiveTool('Shapes')
                })
            },
            addPolygon: () => {
                const octagon = new fabric.Polygon(
                    OCTAGON_POINTS, {
                        ...OCTAGON_OPTIONS
                    });
                addProc(octagon)
                octagon.on('selected', (e) => {
                    setCurrentObject(octagon)
                });
                octagon.on("deselected", () => {
                    setCurrentObject(null)
                    setActiveTool('Shapes')
                })
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
            borderScaleFactor: 3,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6"
        })
        const initialWorkspace = new fabric.Rect({
            width: 1200,
            height: 900,
            name: 'clip',
            fill: 'white',
            selectable: false,
            hasControls: false,
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

