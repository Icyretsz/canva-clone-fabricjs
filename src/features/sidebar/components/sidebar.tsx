import React from 'react';
import Menu from '@/features/sidebar/components/menu'
import SidebarButton from "@/features/sidebar/components/sidebar-button";
import {
    Shapes,
    ALargeSmall,
    Upload
} from 'lucide-react'
import MenuExpandContext from "@/features/editor/contexts/isExpanded";


const Sidebar = () => {
    const {activeTool, setActiveTool, setExpanded} = MenuExpandContext()

    return (
        <div className='h-full'>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex flex-col bg-[#18191a]'>
                <SidebarButton
                    icon={Shapes}
                    label='Shapes'
                    isActive={activeTool === 'Shapes'}
                    onClick={() => {
                        setActiveTool('Shapes')
                        setExpanded(true)
                    }}
                />
                <SidebarButton
                    icon={ALargeSmall}
                    label='Text'
                    isActive={activeTool === 'Text'}
                    onClick={() => {
                        setActiveTool('Text')
                        setExpanded(true)
                    }}
                />
                <SidebarButton
                    icon={Upload}
                    label='Upload'
                    isActive={activeTool === 'Upload'}
                    onClick={() => {
                        setActiveTool('Upload')
                        setExpanded(true)
                    }}
                />
            </div>
            <Menu/>
        </div>
    );
};

export default Sidebar;