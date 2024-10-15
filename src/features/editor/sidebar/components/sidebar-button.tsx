import React from 'react';
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {IconType} from "react-icons";

interface SidebarButtonProps {
    icon : LucideIcon | IconType,
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

    return (
        <Button
        className={cn(
            "w-full h-16 flex flex-col py-1 justify-center items-center bg-[#18191b] hover:bg-[#252627] rounded-none",
            isActive && 'bg-[#252627]'
        )}
        onClick={onClick}
        >
            <Icon color='white' className='size-5 stroke-2 shrink-0'/>
            <span className='text-white text-xs'>
                {label}
            </span>
        </Button>
    );
};

export default SidebarButton;