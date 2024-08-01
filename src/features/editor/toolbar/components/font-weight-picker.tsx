import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import {FaBold} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

interface FontWeightPickerProps {
    editor: Editor | undefined;
}

const FontWeightPicker = ({editor}: FontWeightPickerProps) => {

    const handleOnClick = () => {

        let weight
        if (editor?.fontWeight && typeof editor?.fontWeight === 'number') {
            weight = editor?.fontWeight > 400 ? 400 : 700
            editor?.changeFontWeight(weight)
        }
        console.log(editor?.fontWeight)
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className='outline-none'>
                        <FaBold/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Bold</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default FontWeightPicker;