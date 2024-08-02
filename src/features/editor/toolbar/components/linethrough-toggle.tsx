import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import {FaStrikethrough} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

interface LinethroughToggleProps {
    editor: Editor | undefined;
}

const LinethroughToggle = ({editor}: LinethroughToggleProps) => {

    const handleOnClick = () => {
        if (editor) {
            editor.changeLinethrough(!editor.linethrough);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className={`${editor?.linethrough ? 'bg-gray-200' : ''} outline-none`}>
                        <FaStrikethrough/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Strikethrough</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default LinethroughToggle;