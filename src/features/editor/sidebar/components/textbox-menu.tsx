import React from 'react';
import MenuHeaderDark from "@/features/editor/sidebar/components/menu-header-dark";
import {Editor} from "@/features/editor/sidebar/types";
import {Button} from "@/components/ui/button"

interface ShapeMenuProps {
    editor: Editor | undefined
}


const TextMenu = ({editor}: ShapeMenuProps) => {

    return (
        <div className='flex flex-col gap-2 h-full w-full'>
            <MenuHeaderDark type='Text'/>
            <div className='flex flex-col h-full gap-2 w-full px-7'>
                <div className='flex gap-2'>
                    <Button className='h-[40px] w-[160px] bg-[#14a7df] hover:bg-[#14a7df]/70'
                            onClick={() => editor?.addTextbox('content')}>Add a text box</Button>
                    <Button variant='outline' className='h-[40px] w-[160px]'>Magic write</Button>
                </div>
                <div className='text-white text-[16px]'>Default text styles</div>
                <div className='flex flex-col h-full gap-2 items-center w-full'>
                    <div onClick={() => editor?.addTextbox('heading')}
                         className='w-full h-[64px] border border-gray-400 rounded-lg flex items-center cursor-pointer
                         px-[15px] hover:bg-[#343536] transition-all duration-100 ease-linear'>
                        <span className='text-white text-[28px]'>Add a heading</span>
                    </div>
                    <div onClick={() => editor?.addTextbox('subheading')}
                         className='w-full h-[52.8px] border border-gray-400 rounded-lg flex items-center cursor-pointer
                         px-[15px] hover:bg-[#343536] transition-all duration-100 ease-linear'>
                        <span className='text-white text-[16.8px]'>Add a subheading</span>
                    </div>
                    <div onClick={() => editor?.addTextbox('content')}
                         className='w-full h-[48px] border border-gray-400 rounded-lg flex items-center cursor-pointer
                         px-[15px] hover:bg-[#343536] transition-all duration-100 ease-linear'>
                        <span className='text-white text-[12px]'>Add  little bit of body text</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextMenu;