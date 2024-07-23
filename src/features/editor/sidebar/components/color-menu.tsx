import React, {useState} from 'react';
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {HexColorPicker} from "react-colorful";
import useToolbarStore from "@/features/editor/toolbar/stores/toolbar-store";

interface ColorMenuProps {
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorMenu = ({color, setColor}: ColorMenuProps) => {

    const {currentObject, setCurrentObject} = useToolbarStore();
    currentObject?.set('fill', color)
    currentObject?.canvas?.renderAll()
    return (
        <div className='fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white'>
            <div className='h-full w-full bg-white border-r-[1px] border-gray-200'>
                <MenuHeaderLight type='Color'/>
                <div className='h-full w-full flex'>
                    <HexColorPicker color={color} onChange={setColor}></HexColorPicker>
                </div>
            </div>
        </div>
    );
};

export default ColorMenu;