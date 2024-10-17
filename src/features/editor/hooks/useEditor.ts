import {useCallback, useMemo, useState} from 'react'
import {fabric} from 'fabric'
import useAutoResize from "@/features/editor/hooks/useAutoResize";
import {
    StrokeType,
    INITIAL_CANVAS_STATE,
    STROKE_COLOR,
    STROKE_WIDTH,
    SHAPES_OPTIONS,
    OCTAGON_POINTS,
    STROKE_PATTERNS,
    BuildEditor, fontStyle, positionControlType
} from "@/features/editor/sidebar/types";
import useObjectEvents from "@/features/editor/hooks/useObjectEvents";
import useGetActiveFill from "@/features/editor/hooks/useGetActiveFill";
import useGetStrokeWidth from "@/features/editor/hooks/useGetStrokeWidth";
import useGetStrokeType from "@/features/editor/hooks/useGetStrokeType";
import useGetStrokeColor from "@/features/editor/hooks/useGetStrokeColor";
import {Montserrat} from "next/font/google";
import useGetFontProperties from "@/features/editor/hooks/useGetFontProperties";
import useKeyPress from "@/features/editor/hooks/useKeyPress";
import useObjectStore from "@/features/editor/stores/store";

const montserrat = Montserrat({
    subsets: ['latin', 'vietnamese'],
});

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [fillColor, setFillColor] = useState<string[]>([])
    const [strokeColor, setStrokeColor] = useState<string[]>([])
    const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH)
    const [strokeType, setStrokeType] = useState<StrokeType>("stroke-none")
    const [fontSize, setFontSize] = useState<number[]>([])
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
    const [clipboard, setClipboard] = useState<fabric.Object>()
    const [textAlignment, setTextAlignment] = useState<string>('center')
    const [fontFamily, setFontFamily] = useState<string>('Montserrat')
    const [fontStyle, setFontStyle] = useState<fontStyle>('normal')
    const [fontWeight, setFontWeight] = useState<number | string>('normal')
    const [isUnderlined, setUnderlined] = useState<boolean>(false)
    const [linethrough, setLinethrough] = useState<boolean>(false)
    const [historyUndo, setHistoryUndo] = useState<string[]>([])
    const [historyRedo, setHistoryRedo] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageContainer, setPageContainer] = useState<number[]>([1])
    const [pageThumbnails, setPageThumbnails] = useState<string[]>([])
    const {setOriginalWorkspaceDimension} = useObjectStore()

    const autoZoom = useAutoResize({canvas, container})


    useGetActiveFill(selectedObjects, setFillColor)
    useGetStrokeWidth(selectedObjects, setStrokeWidth)
    useGetStrokeType(selectedObjects, setStrokeType)
    useGetStrokeColor(selectedObjects, setStrokeColor)

    useGetFontProperties(selectedObjects, setFontFamily, setTextAlignment, setFontSize, setFontWeight, setFontStyle, setLinethrough, setUnderlined)


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
                             setStrokeType,
                             fontSize,
                             setFontSize,
                             textAlignment,
                             setTextAlignment,
                             fontFamily,
                             setFontFamily,
                             fontWeight,
                             setFontWeight,
                             fontStyle,
                             setFontStyle,
                             isUnderlined,
                             setUnderlined,
                             linethrough,
                             setLinethrough,
                             currentPage,
                             setCurrentPage,
                             pageContainer,
                             setPageContainer,
                             pageThumbnails,
                             setPageThumbnails,
                             autoZoom
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
            // object.on('mousedown', function (event) {
            //     if (event.button === 3) {
            //         console.log('right click')
            //     }
            // })
            canvas.fire('object:modified', object)
            canvas.setActiveObject(object);
            canvas.renderAll();
        };

        const typeProperties = {
            heading: {
                content: 'Add a heading',
                width: 930,
                fontSize: 120,
                fontWeight: 700
            },
            subheading: {
                content: 'Add a subheading',
                width: 650,
                fontSize: 70,
                fontWeight: 400
            },
            content: {
                content: 'Add a little bit of body text',
                width: 530,
                fontSize: 40,
                fontWeight: 300
            }
        };

        return {
            selectedObjects,
            canvas,
            fillColor,
            strokeColor,
            strokeWidth,
            strokeType,
            fontSize,
            textAlignment,
            fontFamily,
            fontWeight,
            fontStyle,
            isUnderlined,
            linethrough,
            currentPage,
            setCurrentPage,
            pageContainer,
            setPageContainer,
            pageThumbnails,
            setPageThumbnails,
            autoZoom,
            changeFillColor: (value: string) => {
                setFillColor([value])
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    object.set({fill: value})
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeStrokeColor: (value: string) => {
                setStrokeColor([value])
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    object.set({stroke: value})
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeStrokeWidth: (value: number) => {
                setStrokeWidth(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    object.set({
                        strokeWidth: value,
                        strokeUniform: true
                    })
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeStrokeType: (value: StrokeType) => {
                setStrokeType(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    switch (value) {
                        case 'stroke-none':
                            object.set({strokeDashArray: undefined});
                            break;
                        case 'stroke-solid':
                            object.set({strokeDashArray: STROKE_PATTERNS.SOLID});
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
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeFontSize: (value: number) => {
                setFontSize([value])
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('fontSize', value);
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            incrementFontSize: (type: '+' | '-') => {
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        const size = (object as fabric.Textbox).get('fontSize')
                        if (size && type === '+') {
                            (object as fabric.Textbox).set('fontSize', size + 1);
                        } else if (size && type === '-') {
                            (object as fabric.Textbox).set('fontSize', size - 1);
                        }
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeTextAlignment: (alignment: string) => {
                setTextAlignment(alignment)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set({'textAlign': alignment})
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeFontFamily: (value: string) => {
                setFontFamily(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('fontFamily', value)
                    }
                })
                canvas.renderAll();
            },
            changeFontWeight: (value: string | number) => {
                setFontWeight(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('fontWeight', value)
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeFontStyle: (value: fontStyle) => {
                setFontStyle(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('fontStyle', value)
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeUnderline: (value: boolean) => {
                setUnderlined(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('underline', value)
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            changeLinethrough: (value: boolean) => {
                setLinethrough(value)
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        (object as fabric.Textbox).set('linethrough', value)
                    }
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            deleteObject: () => {
                const activeObjects = canvas.getActiveObjects()
                activeObjects.forEach((object) => {
                    object.off()
                    canvas.remove(object);
                    canvas.discardActiveObject();
                })
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll();
            },
            positionControl: (position: positionControlType) => {
                const activeObjects = canvas.getActiveObjects()
                switch (position) {
                    case 'bringForward':
                        activeObjects.forEach((object) => {
                            canvas.bringForward(object)
                        })
                        break;
                    case 'bringToFront':
                        activeObjects.forEach((object) => {
                            canvas.bringToFront(object)
                        })
                        break;
                    case 'sendBackwards':
                        activeObjects.forEach((object) => {

                            const objects = canvas.getObjects()
                            if (object === objects[1]) {
                                return
                            }
                            canvas.sendBackwards(object)
                        })
                        break;
                    case 'sendToBack':
                        activeObjects.forEach((object) => {
                            canvas.sendToBack(object)
                            canvas.moveTo(object, 1)
                        })
                        canvas.renderAll()
                        break;
                }
                canvas.fire('object:modified', activeObjects)
                canvas.renderAll()
            },
            addRect: () => {
                const rect = new fabric.Rect({...SHAPES_OPTIONS.RECTANGLE, name: currentPage.toString()});
                addProc(rect);
                return rect
            },
            addCircle: () => {
                const circle = new fabric.Circle({...SHAPES_OPTIONS.CIRCLE, name: currentPage.toString()});
                addProc(circle);
            },
            addTriangle: () => {
                const triangle = new fabric.Triangle({...SHAPES_OPTIONS.TRIANGLE, name: currentPage.toString()});
                addProc(triangle);
            },
            addPolygon: () => {
                const octagon = new fabric.Polygon(OCTAGON_POINTS, {
                    ...SHAPES_OPTIONS.OCTAGON,
                    name: currentPage.toString()
                });
                addProc(octagon);
            },
            addTextbox: (type?: 'heading' | 'subheading' | 'content', userContent?: string) => {
                if ((type === 'heading' || type === 'subheading' || type === 'content') && userContent === undefined) {
                    const {content, width, fontSize, fontWeight} = typeProperties[type];
                    const textbox = new fabric.Textbox(content, {
                        width: width,
                        fontFamily: montserrat.style.fontFamily,
                        fontSize: fontSize,
                        fontWeight: fontWeight,
                        textAlign: 'center',
                        fill: '#000',
                        strokeWidth: STROKE_WIDTH,
                        stroke: STROKE_COLOR,
                        name: currentPage.toString()
                    });
                    addProc(textbox);
                } else if (type === 'content' && userContent) {
                    const {width, fontSize, fontWeight} = typeProperties[type]
                    const textbox = new fabric.Textbox(userContent, {
                        width: width,
                        fontFamily: montserrat.style.fontFamily,
                        fontSize: fontSize,
                        fontWeight: fontWeight,
                        textAlign: 'center',
                        fill: '#000',
                        strokeWidth: STROKE_WIDTH,
                        stroke: STROKE_COLOR,
                        name: currentPage.toString()
                    });
                    addProc(textbox);
                }

            },
            addMedia: (url: string) => {
                fabric.Image.fromURL(url, function (oImg) {
                    oImg.set('name', currentPage.toString())
                    oImg.scale(0.1)
                    canvas.add(oImg);
                    canvas.setActiveObject(oImg);
                    canvas.centerObject(oImg);
                    canvas.renderAll();
                    canvas.fire('object:modified', oImg)
                    // oImg.on('mousedown', function (event) {
                    //     if (event.button === 3) {
                    //         console.log('right click')
                    //     }
                    // })
                }, {
                    crossOrigin: 'anonymous',
                });
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
                    setStrokeType,
                    fontSize,
                    setFontSize,
                    textAlignment,
                    setTextAlignment,
                    fontFamily,
                    setFontFamily,
                    fontWeight,
                    setFontWeight,
                    fontStyle,
                    setFontStyle,
                    isUnderlined,
                    setUnderlined,
                    linethrough,
                    setLinethrough,
                    clipboard,
                    setClipboard,
                    historyRedo,
                    setHistoryRedo,
                    historyUndo,
                    setHistoryUndo,
                    currentPage,
                    setCurrentPage,
                    pageContainer,
                    setPageContainer,
                    pageThumbnails,
                    setPageThumbnails,
                    autoZoom
                }
            )
        }
        return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects, strokeType, fontSize, textAlignment, fontFamily, fontWeight, fontStyle, isUnderlined, linethrough, clipboard, historyRedo, historyUndo, currentPage, pageContainer, pageThumbnails])

    useObjectEvents({
        canvas,
        selectedObjects,
        setSelectedObjects,
        historyUndo,
        historyRedo,
        setHistoryUndo,
        setHistoryRedo,
        pageContainer,
        pageThumbnails,
        setPageThumbnails,
        editor
    })
    useKeyPress({
        canvas,
        clipboard,
        setClipboard,
        historyUndo,
        historyRedo,
        setHistoryUndo,
        setHistoryRedo,
        autoZoom,
        currentPage,
        pageContainer,
        pageThumbnails,
        setPageThumbnails,
        editor
    })

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
            width: initialContainer.offsetWidth,
            height: initialContainer.offsetHeight,
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
            ),
        })

        initialCanvas.setWidth(
            initialContainer.offsetWidth
        )
        initialCanvas.setHeight(
            initialContainer.offsetHeight
        )

        setOriginalWorkspaceDimension([initialWorkspace.width!, initialWorkspace.height!])

        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace

        setCanvas(initialCanvas)
        setContainer(initialContainer)
    }, [])

    return {init, editor}
};

