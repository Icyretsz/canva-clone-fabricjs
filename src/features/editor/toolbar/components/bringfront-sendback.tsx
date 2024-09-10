import React from 'react';
import { Button } from "@/components/ui/button"
import {Editor} from "@/features/editor/sidebar/types";
import useObjectStore from "@/features/editor/stores/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PositionProps {
    editor: Editor | undefined;
}

const BringfrontSendback = (editor : PositionProps) => {

    const { activeTool, setActiveTool } = useObjectStore()

    const handleClick = () => {
        setActiveTool(activeTool[0], 'Position')
    }

    return (
        <div>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
            <Button variant='ghost' onClick={handleClick}>Position</Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                        <p>Arrangement/ Layers Control</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default BringfrontSendback;