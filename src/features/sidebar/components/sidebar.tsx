import React from 'react';
import Menu from '@/features/sidebar/components/menu'
import SidebarButton from "@/features/sidebar/components/sidebar-button";
import {
    Shapes,
    ALargeSmall,
    Upload
} from 'lucide-react'

const Sidebar = () => {



    return (
        <div className='h-full'>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex flex-col bg-[#18191a]'>
                <SidebarButton
                icon={Shapes}
                label='Shapes'
                onClick={() => {}}
                isActive={false}
                />
                <SidebarButton
                    icon={ALargeSmall}
                    label='Text'
                    onClick={() => {}}
                    isActive={false}
                />
                <SidebarButton
                    icon={Upload}
                    label='Upload'
                    onClick={() => {}}
                    isActive={false}
                />
            </div>
            <Menu/>
        </div>
    );
};

export default Sidebar;