import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetTextAlignment = (
    selectedObjects: fabric.Object[] | undefined,
    setTextAlignment: Dispatch<SetStateAction<string>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length == 1) {
                const alignment = (selectedObjects[0] as fabric.Textbox).get('textAlign')
                setTextAlignment(alignment || 'center')
            }
        }
        , [selectedObjects]
    )
};

export default useGetTextAlignment;