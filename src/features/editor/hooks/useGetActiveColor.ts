import {fabric} from "fabric";
import {useEffect, useState} from "react";

const useGetActiveColor = (
    selectedObjects : fabric.Object[] | undefined,
    activeColors : string[],
    setActiveColors : React.Dispatch<string[]>
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

export default useGetActiveColor;