import React from 'react';
import SidebarButton from "@/features/editor/sidebar/components/sidebar-button";
import {
    Shapes,
    ALargeSmall,
    Upload
} from 'lucide-react'
import MenuExpandContext from "@/features/editor/stores/store";
import ShapeMenu from "@/features/editor/sidebar/components/shape-menu";
import ColorMenu from "@/features/editor/sidebar/components/color-menu"
import {Editor} from "@/features/editor/sidebar/types";


interface SidebarProps {
    editor : Editor | undefined
}

const Sidebar = ({editor} : SidebarProps) => {
    const {activeTool, setActiveTool, setExpanded, isExpanded} = MenuExpandContext()

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
            {isExpanded && <div className='left-[72px] absolute w-[350px] top-[68px] h-[calc(100%-68px)] bg-[#252627]'>
                {activeTool === 'Shapes' && <ShapeMenu editor={editor}/>}
                {(activeTool === 'ShapeFill') && <ColorMenu editor={editor} type='Fill'/>}
                {(activeTool === 'StrokeColor') && <ColorMenu editor={editor} type='Stroke Color'/>}
            </div>}
        </div>
    );
};

export default Sidebar;