import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import {FaUnderline} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

interface UnderlineToggleProps {
    editor: Editor | undefined;
}

const UnderlineToggle = ({editor}: UnderlineToggleProps) => {

    const handleOnClick = () => {
        if (editor) {
            editor.changeUnderline(!editor.isUnderlined);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className={`${editor?.isUnderlined ? 'bg-gray-200' : ''} outline-none`}>
                        <FaUnderline/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Underline</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default UnderlineToggle;