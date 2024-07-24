import React, {useState} from 'react';
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {HexColorPicker} from "react-colorful";
import useMenuStore from "@/features/editor/stores/store";
import {Editor} from "@/features/editor/sidebar/types";

interface ColorMenuProps {
    editor : Editor | undefined;
}

const ColorMenu = ({editor}: ColorMenuProps) => {

    const {currentObject} = useMenuStore();


    currentObject?.canvas?.renderAll()
    return (
        <div className='fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white'>
            <div className='h-full w-full bg-white border-r-[1px] border-gray-200'>
                <MenuHeaderLight type='Color'/>
                <div className='h-full w-full flex'>
                    <HexColorPicker color={editor?.fillColor} onChange={editor?.setFillColor}></HexColorPicker>
                </div>
            </div>
        </div>
    );
};

export default ColorMenu;