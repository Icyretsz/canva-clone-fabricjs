import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";
import {fontStyle} from "@/features/editor/sidebar/types";

const useGetFontProperties = (
    selectedObjects: fabric.Object[] | undefined,
    setFontFamily: Dispatch<SetStateAction<string>>,
    setTextAlignment: Dispatch<SetStateAction<string>>,
    setFontSize: Dispatch<SetStateAction<number[]>>,
    setFontWeight: Dispatch<SetStateAction<number | string>>,
    setFontStyle: Dispatch<SetStateAction<fontStyle>>,
    setLinethough: Dispatch<SetStateAction<boolean>>,
    setUnderlined: Dispatch<SetStateAction<boolean>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length == 1  && selectedObjects[0].type === 'textbox') {

                const font = (selectedObjects[0] as fabric.Textbox).get('fontFamily')
                setFontFamily(font || 'Arial')

                const alignment = (selectedObjects[0] as fabric.Textbox).get('textAlign')
                setTextAlignment(alignment || 'center')

                const weight = (selectedObjects[0] as fabric.Textbox).get('fontWeight')
                setFontWeight(weight || '')

                const style = (selectedObjects[0] as fabric.Textbox).get('fontStyle')
                setFontStyle(style || 'normal')

                const underlined = (selectedObjects[0] as fabric.Textbox).get('underline')
                setUnderlined(underlined || false)

                const linethrough = (selectedObjects[0] as fabric.Textbox).get('linethrough')
                setLinethough(linethrough || false)
            }
            const sizes : number[] = []
            if (selectedObjects && selectedObjects.length > 0) {
                selectedObjects.forEach((object) => {
                    if (object.type === 'textbox') {
                        const fontSize = (object as fabric.Textbox).get('fontSize')
                        if (fontSize && !sizes.includes(fontSize)) {
                            sizes.push(fontSize)
                        }
                    }
                })}
            setFontSize(sizes)
        }
        , [selectedObjects]
    )
};

export default useGetFontProperties;