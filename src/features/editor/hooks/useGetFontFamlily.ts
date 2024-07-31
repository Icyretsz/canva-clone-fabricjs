import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetFontFamily = (
    selectedObjects: fabric.Object[] | undefined,
    setFontFamily: Dispatch<SetStateAction<string>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length == 1) {
                const font = (selectedObjects[0] as fabric.Textbox).get('fontFamily')
                setFontFamily(font || 'Arial')
            }
        }
        , [selectedObjects]
    )
};

export default useGetFontFamily;