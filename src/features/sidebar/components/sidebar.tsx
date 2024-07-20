import React from 'react';
import Menu from '@/features/sidebar/components/menu'
import MenuButton from "@/features/sidebar/components/menuButton";

const Sidebar = () => {

    return (
        <div className='h-full'>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex justify-center bg-[#18191a]'>
                <MenuButton/>
            </div>
            <Menu/>
        </div>
    );
};

export default Sidebar;