import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";

const useGetFontSize = (
    selectedObjects: fabric.Object[] | undefined,
    setFontSize: Dispatch<SetStateAction<number[]>>
) => {

    useEffect(() => {
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
    }, [selectedObjects])
};

export default useGetFontSize;