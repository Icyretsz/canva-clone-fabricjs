import {fabric} from "fabric";
import {Dispatch, SetStateAction, useEffect} from "react";
import {StrokeType} from "@/features/editor/sidebar/types";

const useGetStrokeType = (
    selectedObjects: fabric.Object[] | undefined,
    setStrokeType: Dispatch<SetStateAction<StrokeType>>
) => {

    useEffect(() => {
            if (selectedObjects && selectedObjects.length > 1) return
            if (selectedObjects && selectedObjects.length == 1) {
                const strokeDashArray = selectedObjects[0].get('strokeDashArray')
                const stroke = selectedObjects[0].get('stroke')
                if (strokeDashArray && stroke) {
                    if (strokeDashArray[0] === 1 && strokeDashArray[1] === 1) {
                        setStrokeType('stroke-dot');
                    } else if (strokeDashArray[0] === 5 && strokeDashArray[1] === 5) {
                        setStrokeType('stroke-dash');
                    }
                } else if (!stroke) {
                    setStrokeType('stroke-none');
                } else if (stroke && !strokeDashArray) {
                    setStrokeType('stroke-solid');
                }
            }
        }
        , [selectedObjects]
    )
};

export default useGetStrokeType;