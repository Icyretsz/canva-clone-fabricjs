import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import useMenuStore from "@/features/editor/stores/store";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {textboxFonts} from "@/features/editor/utils";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FontPickerProps {
    editor: Editor | undefined;
}


const FontPicker = ({editor}: FontPickerProps) => {
    const {setActiveTool, setExpanded} = useMenuStore();
    let fontName

    if (textboxFonts(editor).size === 1) {
        if (editor?.fontFamily?.includes('Montserrat')) {
            fontName = 'Montserrat'
        } else if (editor?.fontFamily?.includes('Gluten')) {
            fontName = 'Gluten'
        } else if (editor?.fontFamily?.includes('Bitter')) {
            fontName = 'Bitter'
        }
    } else {
        fontName = 'Multiple fonts'
    }


        return (
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <div className='w-[170px] h-[32px] pl-4 pr-1 flex justify-between items-center cursor-pointer border
        border-gray-400 rounded-md hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                             onClick={() => {
                                 setActiveTool('Font')
                                 setExpanded(true)
                             }}>
                            {fontName} <RiArrowDropDownLine className='size-7'/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                        <p>Font</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
};

export default FontPicker;