import React from 'react';
import MenuHeader from "@/features/editor/sidebar/components/menuHeader";
import {MdRectangle, MdCircle} from "react-icons/md";
import {IoTriangleSharp} from "react-icons/io5";
import {BiSolidPolygon} from "react-icons/bi";


interface ShapeMenuProps {
    editor : {
        addRect : () => void,
        addCircle : () => void,
        addTriangle : () => void,
        addPolygon : () => void
    }
}


const ShapeMenu = ({editor} : ShapeMenuProps) => {

    return (
        <div className='flex flex-col h-full w-full'>
            <MenuHeader/>
            <div className='flex flex-col h-[100px] w-full overflow-x-auto'>
                <div className='w-[500px] h-full flex gap-2 py-2 justify-center'>
                    <MdRectangle className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addRect()}/>
                    <MdCircle className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addCircle()}/>
                    <IoTriangleSharp className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addTriangle()}/>
                    <BiSolidPolygon className='text-gray-200 size-24 cursor-pointer' onClick={() => editor?.addPolygon()}/>
                </div>
            </div>
        </div>
    );
};

export default ShapeMenu;