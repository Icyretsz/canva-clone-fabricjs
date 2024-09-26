import React from 'react';
import MenuHeaderDark from "@/features/editor/sidebar/components/menu-header-dark";
import {MdRectangle, MdCircle} from "react-icons/md";
import {IoTriangleSharp} from "react-icons/io5";
import {BiSolidPolygon} from "react-icons/bi";
import {Editor} from "@/features/editor/sidebar/types";


interface ShapeMenuProps {
    editor : Editor | undefined
}


const ShapeMenu = ({ editor } : ShapeMenuProps) => {

    return (
        <div className='flex flex-col h-full w-full animate-slideRightAndFade'>
            <MenuHeaderDark type='Shapes'/>
            <div className='flex flex-col h-full w-full '>
                <div className='w-full h-full flex gap-2 py-2 justify-center flex-wrap'>
                    <MdRectangle className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addRect()}/>
                    <MdCircle className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addCircle()}/>
                    <IoTriangleSharp className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addTriangle()}/>
                    {/*<BiSolidPolygon className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addPolygon()}/>*/}
                </div>
            </div>
        </div>
    );
};

export default ShapeMenu;