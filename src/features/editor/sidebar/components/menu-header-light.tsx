import React from 'react';
import Image from "next/image";
import MenuExpandContext from "@/features/editor/sidebar/stores/sidebar-store";

interface MenuHeaderProps {
    type : string
}

const MenuHeaderLight = ({type} : MenuHeaderProps) => {
    const {setExpanded} = MenuExpandContext()
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-black'>{type}</div>
            <Image className='cursor-pointer'
                   src='/icons-close-light.svg'
                   width='16'
                   height='16'
                   alt='close icon'
                   onClick={() => setExpanded(false)}
            />
        </div>
    );
};

export default MenuHeaderLight;