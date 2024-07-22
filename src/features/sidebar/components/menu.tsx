import React from 'react';
import MenuExpandContext from "@/features/editor/contexts/isExpanded";
import ShapeMenu from '@/features/sidebar/components/shapeMenu'
const Menu = () => {
    const {isExpanded, activeTool} = MenuExpandContext()
    return (
        <>
            {isExpanded && <div className='left-[72px] absolute w-[350px] top-[68px] h-[calc(100%-68px)] bg-[#252627]'>
                {activeTool === 'Shapes' && <ShapeMenu/>}
            </div>}
        </>
    );
};

export default Menu;