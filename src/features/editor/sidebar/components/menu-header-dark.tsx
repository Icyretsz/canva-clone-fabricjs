import React from 'react';
import Image from "next/image";
import MenuExpandContext from "@/features/editor/stores/store";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface MenuHeaderProps {
    type : string
}

const MenuHeaderDark = ({type} : MenuHeaderProps) => {
    const {setExpanded, activeTool, setActiveTool} = MenuExpandContext()
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-white'>{type}</div>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                        <Image className='cursor-pointer'
                               src='/icons-close-dark.svg'
                               width='16'
                               height='16'
                               alt='close icon'
                               onClick={() => {
                                   setExpanded(false)
                                   setActiveTool('Select', activeTool[1])
                               }}
                        />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                        <p>Close</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    );
};

export default MenuHeaderDark;