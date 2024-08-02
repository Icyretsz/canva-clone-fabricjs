import { fabric } from "fabric";
import { Dispatch, SetStateAction, useEffect } from "react";

const useGetStrokeColor = (
    selectedObjects: fabric.Object[] | undefined,
    setStrokeColor: Dispatch<SetStateAction<string[]>>
) => {

    useEffect(() => {
        const colors: Set<string> = new Set();

        if (selectedObjects && selectedObjects.length > 0) {
            selectedObjects.forEach((object) => {
                if (!object.type !== 'image') {
                const strokeColor = object.get('stroke');
                if (strokeColor && typeof strokeColor === 'string') {
                    colors.add(strokeColor);
                }
            }});
        }

        setStrokeColor(Array.from(colors));
    }, [selectedObjects, setStrokeColor]);
};

export default useGetStrokeColor;
