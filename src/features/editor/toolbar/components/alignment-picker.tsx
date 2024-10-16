import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import {Button} from "@/components/ui/button"
import {FaAlignLeft, FaAlignCenter, FaAlignRight} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface AlignmentPickerProps {
    editor: Editor | undefined;
}

const AlignmentPicker = ({editor}: AlignmentPickerProps) => {

    const alignment = editor?.textAlignment

    const handleOnClick = () => {
        if (alignment && alignment === 'left') {
            editor?.changeTextAlignment('center')
        } else if (alignment && alignment === 'center') {
            editor?.changeTextAlignment('right')
        } else {
            editor?.changeTextAlignment('left')
        }
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className='outline-none'>
                        {alignment && alignment === 'left' && <FaAlignLeft className='size-5'/>}
                        {alignment && alignment === 'center' && <FaAlignCenter className='size-5'/>}
                        {alignment && alignment === 'right' && <FaAlignRight className='size-5'/>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Alignment</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AlignmentPicker;