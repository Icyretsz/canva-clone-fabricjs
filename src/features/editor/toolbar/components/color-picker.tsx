import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useMenuStore from "@/features/editor/stores/store";
import {Editor} from "@/features/editor/sidebar/types";

interface ColorPickerProps {
    editor: Editor | undefined;
    type: 'fill' | 'stroke';
}

const ColorPicker = ({ editor, type }: ColorPickerProps) => {
    const { setActiveTool, setExpanded } = useMenuStore();
    const colors = type === 'fill' ? editor?.fillColor : editor?.strokeColor;
    const toolType = type === 'fill' ? 'ShapeFill' : 'StrokeColor';

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <div className='flex size-10 hover:bg-gray-200 rounded justify-center items-center'>
                    <div
                        className='flex rounded-full size-8 relative cursor-pointer overflow-hidden'
                        onClick={() => {
                            setActiveTool(toolType);
                            setExpanded(true);
                        }}
                    >
                        {(colors && colors.length > 0) && (
                            <div className="flex w-full h-full relative">
                                {colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="absolute top-0 h-full"
                                        style={{
                                            backgroundColor: color,
                                            width: `${100 / colors.length}%`,
                                            left: `${(100 / colors.length) * index}%`
                                        }}
                                    ></div>
                                ))}
                                {type === 'stroke' && (
                                    <div className='size-4 absolute top-[8px] left-[8px] rounded-full bg-white z-50'></div>
                                )}
                            </div>
                        )}
                    </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{type === 'fill' ? 'Color Picker' : 'Stroke Color'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ColorPicker;
