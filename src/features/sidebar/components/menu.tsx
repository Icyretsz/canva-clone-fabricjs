import React from 'react';
import MenuExpandContext from "@/features/editor/contexts/isExpanded";

const Menu = () => {
    const {isExpanded} = MenuExpandContext()
    return (
        <>
            {isExpanded && <div className='left-[72px] absolute w-[350px] top-[68px] h-[calc(100%-68px)] bg-[#252627]'></div>}
        </>
    );
};

export default Menu;