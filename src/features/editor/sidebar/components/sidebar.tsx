import React from 'react';
import SidebarButton from "@/features/editor/sidebar/components/sidebar-button";
import {
    Shapes,
    ALargeSmall,
    Upload
} from 'lucide-react'
import { LuLayoutTemplate } from "react-icons/lu";
import useObjectStore from "@/features/editor/stores/store";
import ShapeMenu from "@/features/editor/sidebar/components/shape-menu";
import ColorMenu from "@/features/editor/sidebar/components/color-menu"
import TemplatesMenu from "@/features/editor/sidebar/components/templates-menu"
import {Editor} from "@/features/editor/sidebar/types";
import TextMenu from "@/features/editor/sidebar/components/textbox-menu";
import FontMenu from "@/features/editor/sidebar/components/font-menu";
import PositionMenu from "@/features/editor/sidebar/components/position-menu";


interface SidebarProps {
    editor : Editor | undefined
}

const Sidebar = ({editor} : SidebarProps) => {
    const {activeTool, setActiveTool, setExpanded, isExpanded} = useObjectStore()

    return (
        <div className='h-full'>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex flex-col bg-[#18191a]'>
                <SidebarButton
                    icon={LuLayoutTemplate}
                    label='Templates'
                    isActive={activeTool[0] === 'Templates'}
                    onClick={() => {
                        setActiveTool('Templates', "")
                        setExpanded(true)
                    }}

                />
                <SidebarButton
                    icon={Shapes}
                    label='Shapes'
                    isActive={activeTool[0] === 'Shapes'}
                    onClick={() => {
                        setActiveTool('Shapes', "")
                        setExpanded(true)
                    }}

                />
                <SidebarButton
                    icon={ALargeSmall}
                    label='Text'
                    isActive={activeTool[0] === 'Text'}
                    onClick={() => {
                        setActiveTool('Text', "")
                        setExpanded(true)
                    }}
                />
                <SidebarButton
                    icon={Upload}
                    label='Upload'
                    isActive={activeTool[0] === 'Upload'}
                    onClick={() => {
                        setActiveTool('Upload', "")
                        setExpanded(true)
                    }}
                />
            </div>
            {isExpanded && <div className='left-[72px] absolute w-[350px] top-[68px] h-[calc(100%-68px)] bg-[#252627]'>
                {activeTool[0] === 'Templates' && <TemplatesMenu editor={editor}/>}
                {activeTool[0] === 'Shapes' && <ShapeMenu editor={editor}/>}
                {(activeTool[1] === 'ShapeFill') && <ColorMenu editor={editor} type='Fill'/>}
                {(activeTool[1] === 'StrokeColor') &&  <ColorMenu editor={editor} type='Stroke Color'/>}
                {(activeTool[0] === 'Text') &&  <TextMenu editor={editor}/>}
                {(activeTool[1] === 'Font') &&  <FontMenu editor={editor}/>}
                {(activeTool[1] === 'Position') &&  <PositionMenu editor={editor} type='Position'/>}
            </div>}
        </div>
    );
};

export default Sidebar;