import React from 'react';
import MenuExpandContext from "@/features/editor/contexts/isExpanded";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

interface SidebarButtonProps {
    icon : LucideIcon,
    label : string,
    onClick : () => void,
    isActive? : boolean
}

const SidebarButton = (
    {
        icon: Icon,
        label,
        onClick,
        isActive
    } : SidebarButtonProps
) => {

    const {setExpanded} = MenuExpandContext()
    const {activeButton, setActiveButton} = MenuExpandContext()
    const menuButtons = ['Shapes', 'Text', 'Upload']

    const handleButtonClick = (index : string) => {
        setActiveButton(index)
        setExpanded(true)
    }




    return (
        <button
        className={cn(
            "w-full h-16 flex flex-col py-1 justify-center items-center bg-[#18191b] hover:bg-[#252627]",
            isActive && 'bg-[#252627]'
        )}
        >
            <Icon color='white' className='size-5 stroke-2 shrink-0'/>
            <span className='text-white text-xs'>
                {label}
            </span>
        </button>
    );
};

export default SidebarButton;