import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetActiveStrokeWidth = (
    selectedObjects: fabric.Object[] | undefined,
    setStrokeWidth: Dispatch<SetStateAction<number>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length > 0) {
                const strokeWidth = selectedObjects[0].get('strokeWidth')
                setStrokeWidth(strokeWidth || 0)
            }
        }
        , [selectedObjects]
    )
};

export default useGetActiveStrokeWidth;