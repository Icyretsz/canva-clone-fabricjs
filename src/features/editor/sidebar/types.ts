import {fabric} from "fabric";
import {Dispatch, SetStateAction} from "react";

export type ActiveTool =
    | "Select"
    | "Shapes"
    | "Text"
    | "Upload"
    | "ColorPicker"

export const FILL_COLOR = '#D1D5DB'
export const STROKE_COLOR = '#D1D5DB'
export const STROKE_WIDTH = 2

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

export interface Editor {
    activeColors : string[],
    setActiveColors : Dispatch<SetStateAction<string[]>>,
    selectedObjects : fabric.Object[]
    canvas: fabric.Canvas,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    setFillColor: (value: string) => void,
    setStrokeColor: (value: string) => void,
    setStrokeWidth: (value: number) => void,
    addRect: () => void,
    addCircle: () => void,
    addTriangle: () => void,
    addPolygon: () => void
}

export interface BuildEditor {
    activeColors : string[],
    setActiveColors : Dispatch<SetStateAction<string[]>> ,
    selectedObjects : fabric.Object[]
    canvas: fabric.Canvas,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    setFillColor: (value: string) => void,
    setStrokeColor: (value: string) => void,
    setStrokeWidth: (value: number) => void,
}
