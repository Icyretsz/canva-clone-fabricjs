import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetStrokeColor = (
    selectedObjects : fabric.Object[] | undefined,
    setStrokeColor : Dispatch<SetStateAction<string[]> >
) => {

    useEffect(() => {
        const colors : string[] = []
        if (selectedObjects && selectedObjects.length > 0) {
            selectedObjects.forEach((object) => {
                const fillColor = object.get('stroke')
                if (fillColor && !colors.includes(fillColor)) {
                    colors.push(fillColor)
                }
            })}
        setStrokeColor(colors)
    }, [selectedObjects])
};

export default useGetStrokeColor;