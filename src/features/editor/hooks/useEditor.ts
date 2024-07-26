import {useCallback, useMemo, useState} from 'react'
import {fabric} from 'fabric'
import useAutoResize from "@/features/editor/hooks/useAutoResize";
import useMenuStore from "@/features/editor/stores/store";
import {
    FILL_COLOR,
    STROKE_COLOR,
    STROKE_WIDTH,
    RECTANGLE_OPTIONS,
    TRIANGLE_OPTIONS,
    CIRCLE_OPTIONS,
    OCTAGON_POINTS,
    OCTAGON_OPTIONS,
    BuildEditor
} from "@/features/editor/sidebar/types";
import {isTextType} from "@/features/editor/utils"
import useCanvasEvents from "@/features/editor/hooks/useObjectEvents";
import useGetActiveColor from "@/features/editor/hooks/useGetActiveColor";

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const {setActiveTool, setCurrentObject} = useMenuStore()
    const [fillColor, setFillColor] = useState(FILL_COLOR)
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
    const [activeColors, setActiveColors] = useState<string[]>([])

    useAutoResize({canvas, container})
    useCanvasEvents({canvas, selectedObjects, setSelectedObjects})
    useGetActiveColor(selectedObjects, activeColors, setActiveColors)

    const buildEditor = ({
                             selectedObjects,
                             canvas,
                             fillColor,
                             setFillColor,
                             strokeColor,
                             setStrokeColor,
                             strokeWidth,
                             setStrokeWidth,
                             activeColors
                         }: BuildEditor) => {
        const getWorkspace = () => {
            return canvas.getObjects().find((object) => object.name === "clip");
        };

        const center = (object: fabric.Object) => {
            const workspace = getWorkspace();
            const center = workspace?.getCenterPoint();

            if (!center) return;

            // @ts-ignore
            canvas._centerObject(object, center);
        };

        const addProc = (object: fabric.Object) => {
            center(object);
            canvas.add(object);
            canvas.setActiveObject(object);
            canvas.renderAll();
        };

        const registerEvents = (object: fabric.Object) => {
            const handleSelected = () => setCurrentObject(object);
            const handleDeselected = () => {
                setCurrentObject(null);
                setActiveTool('Shapes');
            };

            object.on('selected', handleSelected);
            object.on('deselected', handleDeselected);

            // Return a function to remove the event listeners
            return () => {
                object.off('selected', handleSelected);
                object.off('deselected', handleDeselected);
            };
        };

        return {
            activeColors,
            selectedObjects,
            canvas,
            fillColor,
            strokeColor,
            strokeWidth,
            setFillColor: (value: string) => {
                setFillColor(value)
                canvas.getActiveObjects().forEach((object) => {
                    object.set({fill: value})
                })
                canvas.renderAll();
            },
            setStrokeColor: (value: string) => {
                setStrokeColor(value)
                canvas.getActiveObjects().forEach((object) => {
                    if (isTextType(object.type)) {
                        object.set({fill: value})
                        return
                    }
                    object.set({stroke: value})
                })
                canvas.renderAll();
            },
            setStrokeWidth: (value: number) => {
                setStrokeWidth(value)
                canvas.getActiveObjects().forEach((object) => {

                    object.set({strokeWidth: value})
                })
                canvas.renderAll();
            },
            addRect: () => {
                const rect = new fabric.Rect({...RECTANGLE_OPTIONS});
                addProc(rect);
                return registerEvents(rect);
            },
            addCircle: () => {
                const circle = new fabric.Circle({...CIRCLE_OPTIONS});
                addProc(circle);
                return registerEvents(circle);
            },
            addTriangle: () => {
                const triangle = new fabric.Triangle({...TRIANGLE_OPTIONS});
                addProc(triangle);
                return registerEvents(triangle);
            },
            addPolygon: () => {
                const octagon = new fabric.Polygon(OCTAGON_POINTS, {...OCTAGON_OPTIONS});
                addProc(octagon);
                return registerEvents(octagon);
            },
        };
    };


    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor(
                {
                    selectedObjects,
                    canvas,
                    fillColor,
                    setFillColor,
                    strokeColor,
                    setStrokeColor,
                    strokeWidth,
                    setStrokeWidth,
                    activeColors,
                    setActiveColors
                }
            )
        }
        return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects, activeColors])

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

