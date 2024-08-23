import React from 'react';
import Image from "next/image";
import MenuExpandContext from "@/features/editor/stores/store";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface MenuHeaderProps {
    type : string
}

const MenuHeaderLight = ({type} : MenuHeaderProps) => {
    const {setExpanded, setActiveTool} = MenuExpandContext()
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-black'>{type}</div>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                        <Image className='cursor-pointer'
                               src='/icons-close-light.svg'
                               width='16'
                               height='16'
                               alt='close icon'
                               onClick={() => {
                                   setExpanded(false)
                                   setActiveTool('Select')
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

export default MenuHeaderLight;