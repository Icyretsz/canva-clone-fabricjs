import React from 'react';
import MenuHeaderDark from "@/features/editor/sidebar/components/menu-header-dark";
import {Editor} from "@/features/editor/sidebar/types";


interface ShapeMenuProps {
    editor : Editor | undefined
}


const TextMenu = ({ editor } : ShapeMenuProps) => {

    return (
        <div className='flex flex-col h-full w-full'>
            <MenuHeaderDark type='Text'/>
            <div className='flex flex-col h-[100px] justify-center items-center w-full'>
                    <div onClick={editor?.addTextbox} className='w-[295px] h-[60px] rounded flex justify-center items-center'>
                        <span className='text-white'>Add textbox</span>
                    </div>
            </div>
        </div>
    );
};

export default TextMenu;