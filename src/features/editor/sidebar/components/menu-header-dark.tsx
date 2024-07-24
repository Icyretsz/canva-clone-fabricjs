import React from 'react';
import Image from "next/image";
import MenuExpandContext from "@/features/editor/stores/store";

interface MenuHeaderProps {
    type : string
}

const MenuHeaderDark = ({type} : MenuHeaderProps) => {
    const {setExpanded} = MenuExpandContext()
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-white'>{type}</div>
            <Image className='cursor-pointer'
                   src='/icons-close-dark.svg'
                   width='16'
                   height='16'
                   alt='close icon'
                   onClick={() => setExpanded(false)}
            />
        </div>
    );
};

export default MenuHeaderDark;