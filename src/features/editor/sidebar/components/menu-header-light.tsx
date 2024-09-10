import React from 'react';

interface MenuHeaderProps {
    type : string
}

const MenuHeaderLight = ({type} : MenuHeaderProps) => {
    return (
        <div className='flex justify-between items-center h-[48px] px-4'>
            <div className='text-black'>{type}</div>
        </div>
    );
};

export default MenuHeaderLight;