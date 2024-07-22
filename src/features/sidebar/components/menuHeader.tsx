import React from 'react';
import Image from "next/image";
import MenuExpandContext from "@/features/sidebar/contexts/sidebar-store";

const MenuHeader = () => {
    const {setExpanded} = MenuExpandContext()
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-white '>Shapes</div>
            <Image className='cursor-pointer'
                   src='/icons-close.svg'
                   width='16'
                   height='16'
                   alt='close icon'
                   onClick={() => setExpanded(false)}
            />
        </div>
    );
};

export default MenuHeader;