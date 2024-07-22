import React from 'react';
import MenuHeader from "@/features/sidebar/components/menuHeader";
import { MdRectangle, MdCircle } from "react-icons/md";
import { IoTriangleSharp } from "react-icons/io5";
import { BiSolidPolygon } from "react-icons/bi";

const ShapeMenu = () => {

    return (
        <div className='flex flex-col h-full w-full'>
            <MenuHeader/>
            <div className='flex flex-col h-[100px] w-full overflow-x-auto'>
            <div className='w-[500px] h-[100px] flex gap-2 py-2 justify-center'>
                <MdRectangle className='text-gray-200 size-24'/>
                <MdCircle className='text-gray-200 size-24'/>
                <IoTriangleSharp className='text-gray-200 size-24'/>
                <BiSolidPolygon className='text-gray-200 size-24'/>
            </div>
            </div>
        </div>
    );
};

export default ShapeMenu;