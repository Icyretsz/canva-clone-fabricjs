import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetFontSize = (
    selectedObjects: fabric.Object[] | undefined,
    setFontSize: Dispatch<SetStateAction<number>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length == 1) {
                const fontSize = (selectedObjects[0] as fabric.Textbox).get("fontSize")
                setFontSize(fontSize || 0)
            }
        }
        , [selectedObjects]
    )
};

export default useGetFontSize;