import React from 'react';
import MenuHeader from "@/features/sidebar/components/menuHeader";

const ShapeMenu = () => {

    return (
        <div className='flex flex-col h-full w-full overflow-x-auto'>
            <MenuHeader/>
            <div className='w-[500px] h-[150px] bg-gray-200 '>hi</div>
        </div>
    );
};

export default ShapeMenu;