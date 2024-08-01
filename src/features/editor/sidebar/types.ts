import {fabric} from "fabric";

export type ActiveTool =
    | "Select"
    | "Shapes"
    | "Text"
    | "Upload"
    | "ShapeFill"
    | "StrokeColor"
    | "Font"
    | ""

export const FILL_COLOR = '#D1D5DB'
export const STROKE_COLOR = '#000'
export const STROKE_WIDTH = 0
export const STROKE_PATTERNS = {
    SOLID: undefined,
    DASH: [20, 10],
    DOT: [3, 3]
}

export const RECTANGLE_OPTIONS = {
    width: 140,
    height: 120,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH
}
export const CIRCLE_OPTIONS = {
    radius: 60,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH
}
export const TRIANGLE_OPTIONS = {
    width: 120,
    height: 120,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH
}

export const TEXT_HEADING = {
    fontSize: 28,
    fontWeight: 'bold',
}

export const TEXT_SUBHEADING = {
    fontSize: 16.8,
}

export const TEXT_CONTENT = {
    fontSize: 12,
    fontWeight: 'light',
}

export const OCTAGON_POINTS = [
    new fabric.Point(20, 52.73),
    new fabric.Point(37.29, 37.29),
    new fabric.Point(52.73, 20),
    new fabric.Point(52.73, -20),
    new fabric.Point(37.29, -37.29),
    new fabric.Point(20, -52.73),
    new fabric.Point(-20, -52.73),
    new fabric.Point(-37.29, -37.29),
    new fabric.Point(-52.73, -20),
    new fabric.Point(-52.73, 20),
    new fabric.Point(-37.29, 37.29),
    new fabric.Point(-20, 52.73),
];


export const OCTAGON_OPTIONS = {
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH
}

export type StrokeType = "stroke-none" | "stroke-solid" | "stroke-dash" | "stroke-dot";

export type fontStyle = "" | "normal" | "italic" | "oblique" | undefined

export interface Editor {
    selectedObjects: fabric.Object[]
    canvas: fabric.Canvas,
    fillColor: string[],
    strokeColor: string[],
    strokeWidth: number,
    strokeType: StrokeType,
    fontSize: number[],
    textAlignment: string,
    fontFamily: string,
    fontWeight: number | string,
    fontStyle: fontStyle,
    isUnderlined: boolean,
    linethrough: boolean,
    changeStrokeType: (value: StrokeType) => void,
    changeFillColor: (value: string) => void,
    changeStrokeColor: (value: string) => void,
    changeStrokeWidth: (value: number) => void,
    changeFontSize: (value: number) => void,
    incrementFontSize: (type: '+' | '-') => void,
    changeTextAlignment: (alignment: string) => void,
    changeFontFamily: (value: string) => void,
    changeFontWeight: (value: string | number) => void,
    changeFontStyle: (value: fontStyle) => void,
    changeUnderline: (value: boolean) => void,
    changeLinethrough: (value: boolean) => void,
    addRect: () => void,
    addCircle: () => void,
    addTriangle: () => void,
    addPolygon: () => void
    addTextbox: (type: 'heading' | 'subheading' | 'content') => void
}

export interface BuildEditor {
    selectedObjects: fabric.Object[]
    canvas: fabric.Canvas,
    fillColor: string[],
    strokeColor: string[],
    strokeWidth: number,
    strokeType: StrokeType,
    fontSize: number[],
    textAlignment: string,
    fontFamily: string,
    fontWeight: number | string,
    fontStyle: fontStyle,
    isUnderlined: boolean,
    linethrough: boolean,
    setFontWeight: (value : number | string) => void,
    setFontStyle: (value : fontStyle) => void,
    setUnderlined: (value : boolean) => void,
    setLinethrough: (value : boolean) => void,
    setFontSize: (value: number[]) => void,
    setStrokeType: (value: StrokeType) => void,
    setFillColor: (value: string[]) => void,
    setStrokeColor: (value: string[]) => void,
    setStrokeWidth: (value: number) => void,
    setTextAlignment: (alignment: string) => void,
    setFontFamily: (value: string) => void
}

