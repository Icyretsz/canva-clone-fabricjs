import React from 'react';
import MenuHeaderDark from "@/features/editor/sidebar/components/menu-header-dark";
import {MdRectangle, MdCircle} from "react-icons/md";
import {IoTriangleSharp} from "react-icons/io5";
import {BiSolidPolygon} from "react-icons/bi";
import {Editor} from "@/features/editor/sidebar/types";



interface UploadMenuProps {
    editor : Editor | undefined
}


const UploadMenu = ({ editor } : UploadMenuProps) => {

    return (
        <div className='flex flex-col h-full w-full'>
            <MenuHeaderDark type='Upload'/>
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

export default UploadMenu;