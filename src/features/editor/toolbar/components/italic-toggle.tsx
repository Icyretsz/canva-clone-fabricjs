import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import {FaItalic} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

interface FontStyleToggleProps {
    editor: Editor | undefined;
}

const ItalicToggle = ({editor}: FontStyleToggleProps) => {

    const handleOnClick = () => {
        if (editor) {
            editor.changeFontStyle(editor.fontStyle === 'italic' ? 'normal' : 'italic');
        }
    };

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className={`${editor?.fontStyle === 'italic' ? 'bg-gray-200' : ''} outline-none`}>
                        <FaItalic/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Italic</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ItalicToggle;