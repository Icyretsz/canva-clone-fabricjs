import React, {useEffect, useState} from 'react';
import useToolbarStore from "@/features/editor/toolbar/stores/toolbar-store";
import useMenuStore from "@/features/editor/sidebar/stores/sidebar-store";
import {fabric} from "fabric";
import ColorMenu from "@/features/editor/sidebar/components/color-menu";

const ShapeToolbarColor = () => {
    const { currentObject, setCurrentObject } = useToolbarStore();
    const {activeTool, setActiveTool, setExpanded} = useMenuStore()


    const getColor = () => {
        if (currentObject) {
            const fill = currentObject.get('fill');
            if (typeof fill === 'string') {
                return fill;
            } else if (fill instanceof fabric.Pattern) {
                return 'Pattern';
            } else if (fill instanceof fabric.Gradient) {
                return 'Gradient';
            }
        }
        return 'N/A';
    };

    const [color, setColor] = useState(getColor);

    useEffect(() => {
        setColor(getColor());
    }, [currentObject]);

    const handleClick = () => {
        setActiveTool('ColorPicker')
        setExpanded(true)
    }

    if (currentObject !== null) {
        return (
            <>
            <div className="h-full w-full bg-white flex items-center px-3">
                <div style={{backgroundColor: color === 'Pattern' || color === 'Gradient' ? 'transparent' : color}}
                     className='size-7 rounded-full ' onClick={handleClick}></div>
            </div>
                {activeTool === 'ColorPicker' && <ColorMenu color={color} setColor={setColor}/>}
            </>

        );
    }

    return null;
};

export default ShapeToolbarColor;