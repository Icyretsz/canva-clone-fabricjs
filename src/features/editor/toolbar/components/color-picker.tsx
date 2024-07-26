import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import useMenuStore from "@/features/editor/stores/store";
import {Editor} from "@/features/editor/sidebar/types";

interface ColorPickerProps {
    editor: Editor | undefined;
}

const ColorPicker = ({editor} : ColorPickerProps) => {
    const {setActiveTool, setExpanded} = useMenuStore()
    const fillColors = editor?.fillColor

    return (
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <div className='flex rounded-full size-10 relative cursor-pointer overflow-hidden'
                             onClick={() => {
                                 setActiveTool('ColorPicker')
                                 setExpanded(true)
                             }}
                        >
                            {(fillColors && fillColors.length > 0) && <div className="flex w-full h-full relative">
                                {fillColors.map((color, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="absolute top-0 h-full"
                                            style={{
                                                backgroundColor: color,
                                                width: `${100 / fillColors.length}%`,
                                                left: `${(100 / fillColors.length) * index}%`
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Color Picker</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
    );
};

export default ColorPicker;