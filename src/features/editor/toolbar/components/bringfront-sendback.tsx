import React from 'react';
import { Button } from "@/components/ui/button"
import useObjectStore from "@/features/editor/stores/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const BringfrontSendback = () => {

    const { activeTool, setActiveTool, setExpanded } = useObjectStore()

    const handleClick = () => {
        setActiveTool(activeTool[0], 'Position')
        setExpanded(true)
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