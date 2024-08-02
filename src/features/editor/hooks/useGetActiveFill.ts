import { fabric } from "fabric";
import { Dispatch, SetStateAction, useEffect } from "react";

const useGetActiveFill = (
    selectedObjects: fabric.Object[] | undefined,
    setFillColor: Dispatch<SetStateAction<string[]>>
) => {

    useEffect(() => {
        const colors: Set<string> = new Set();

        if (selectedObjects && selectedObjects.length > 0) {
            selectedObjects.forEach((object) => {
                const fillColor = object.get('fill');
                if (fillColor && typeof fillColor === 'string') {
                    colors.add(fillColor);
                }
            });
        }

        setFillColor(Array.from(colors));
    }, [selectedObjects, setFillColor]);
};

export default useGetActiveFill;
