import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetActiveFill = (
    selectedObjects : fabric.Object[] | undefined,
    setActiveColors : Dispatch<SetStateAction<string[]> >
) => {

    useEffect(() => {
        const colors : string[] = []
        if (selectedObjects && selectedObjects.length > 0) {
        selectedObjects.forEach((object) => {
            const fillColor = object.get('fill')
            if (fillColor && typeof fillColor === 'string' && !colors.includes(fillColor)) {
                colors.push(fillColor)
            }
        })}
        setActiveColors(colors)
    }, [selectedObjects])
};

export default useGetActiveFill;