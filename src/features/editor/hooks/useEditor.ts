import {useCallback, useMemo, useState} from 'react'
import {fabric} from 'fabric'
import useAutoResize from "@/features/editor/hooks/useAutoResize";
import useMenuStore from "@/features/editor/stores/store";
import {
    StrokeType,
    STROKE_COLOR,
    STROKE_WIDTH,
    RECTANGLE_OPTIONS,
    TRIANGLE_OPTIONS,
    CIRCLE_OPTIONS,
    OCTAGON_POINTS,
    OCTAGON_OPTIONS,
    STROKE_PATTERNS,
    BuildEditor
} from "@/features/editor/sidebar/types";
import {isTextType} from "@/features/editor/utils"
import useCanvasEvents from "@/features/editor/hooks/useObjectEvents";
import useGetActiveFill from "@/features/editor/hooks/useGetActiveFill";
import useGetStrokeWidth from "@/features/editor/hooks/useGetStrokeWidth";
import useGetStrokeType from "@/features/editor/hooks/useGetStrokeType";
import useGetStrokeColor from "@/features/editor/hooks/useGetStrokeColor";

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const {setActiveTool} = useMenuStore()
    const [fillColor, setFillColor] = useState<string[]>([])
    const [strokeColor, setStrokeColor] = useState<string[]>([])
    const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH)
    const [strokeType, setStrokeType] = useState<StrokeType>("stroke-none")
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])

    useAutoResize({canvas, container})
    useCanvasEvents({canvas, selectedObjects, setSelectedObjects})
    useGetActiveFill(selectedObjects, setFillColor)
    useGetStrokeWidth(selectedObjects, setStrokeWidth)
    useGetStrokeType(selectedObjects, setStrokeType)
    useGetStrokeColor(selectedObjects, setStrokeColor)

    const buildEditor = ({
                             selectedObjects,
                             canvas,
                             fillColor,
                             setFillColor,
                             strokeColor,
                             setStrokeColor,
                             strokeWidth,
                             setStrokeWidth,
                             strokeType,
                             setStrokeType
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
            const handleDeselected = () => {

            };

            object.on('deselected', handleDeselected);

            return () => {
                object.off('deselected', handleDeselected);
            };
        };

        return {
            selectedObjects,
            canvas,
            fillColor,
            strokeColor,
            strokeWidth,
            strokeType,
            changeFillColor: (value: string) => {
                setFillColor([value])
                canvas.getActiveObjects().forEach((object) => {
                    object.set({fill: value})
                })
                canvas.renderAll();
            },
            changeStrokeColor: (value: string) => {
                setStrokeColor([value])
                canvas.getActiveObjects().forEach((object) => {
                    if (isTextType(object.type)) {
                        object.set({fill: value})
                        return
                    }
                    object.set({stroke: value})
                })
                canvas.renderAll();
            },
            changeStrokeWidth: (value: number) => {
                setStrokeWidth(value)
                canvas.getActiveObjects().forEach((object) => {
                    object.set({
                        strokeWidth: value,
                        strokeUniform: true
                    })
                })
                canvas.renderAll();
            },
            changeStrokeType: (value: StrokeType) => {
                setStrokeType(value)
                canvas.getActiveObjects().forEach((object, index) => {
                    switch (value) {
                        case 'stroke-none':
                            object.set({strokeDashArray: undefined});
                            break;
                        case 'stroke-solid':
                            object.set({ strokeDashArray: STROKE_PATTERNS.SOLID});
                            break;
                        case 'stroke-dash':
                            object.set({strokeDashArray: STROKE_PATTERNS.DASH});
                            break;
                        case 'stroke-dot':
                            object.set({strokeDashArray: STROKE_PATTERNS.DOT});
                            break;
                        default:
                            break;
                    }
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
            addTextbox: () => {
                const textbox = new fabric.Textbox('This is a Textbox.', {
                    left: 50,
                    top: 200,
                    width: 300,
                    fontFamily: 'Arial',
                    fontSize: 24,
                    fill: 'black'
                });
                addProc(textbox);
                return registerEvents(textbox);
            }
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
                    strokeType,
                    setStrokeType
                }
            )
        }
        return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects, strokeType])

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

