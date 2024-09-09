'use client'
import React, {useState} from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Button} from "@/components/ui/button"
import { TbStackForward } from "react-icons/tb";
import { TbStackFront } from "react-icons/tb";
import { TbStackBackward } from "react-icons/tb";
import { TbStackBack } from "react-icons/tb";

interface PositionMenuProps {
    editor: Editor | undefined;
    type: string
}

const PositionMenu = ({editor, type}: PositionMenuProps) => {
    const [currentTab, setCurrentTab] = useState<string>('')

    const handleOnClick = (type: string) => {
        setCurrentTab(type)
    }

    return (
        <div>
            <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
                <div className="flex flex-col h-full w-full bg-white border-r-[1px] border-gray-200 px-[5px]">
                    <div className=' w-full'>
                        <MenuHeaderLight type={type}/>
                        <div className=" w-full flex justify-center px-[5px] mb-[10px]">
                            <Button variant='ghost' className='w-[50%] relative'
                                    onClick={() => handleOnClick('arrange')}>
                                Arrange
                                {currentTab === 'arrange' &&
                                    <div className='absolute top-[100%] h-[5px] w-full rounded-xl bg-[#0cbc84]'></div>}
                            </Button>
                            <Button variant='ghost' className='w-[50%] relative'
                                    onClick={() => handleOnClick('layers')}>
                                Layers
                                {currentTab === 'layers' &&
                                    <div className='absolute top-[100%] h-[5px] w-full bg-[#0cbc84] rounded-xl'></div>}
                            </Button>
                        </div>
                    </div>
                    {currentTab === 'arrange' && <div className='h-[10%] w-full flex flex-wrap'>
                        <Button variant='ghost' className='flex justify-center items-center h-[50%] w-[50%]'><TbStackForward className='size-8'/></Button>
                        <Button variant='ghost' className='flex justify-center items-center h-[50%] w-[50%]'><TbStackBackward className='size-8'/></Button>
                        <Button variant='ghost' className='flex justify-center items-center h-[50%] w-[50%]'><TbStackFront className='size-8'/></Button>
                        <Button variant='ghost' className='flex justify-center items-center h-[50%] w-[50%]'><TbStackBack className='size-8'/></Button>
                    </div>}
                    {currentTab === 'layers' && <div className='h-full w-full bg-pink-400'>Layers</div>}
                </div>
            </div>
        </div>
    );
};

export default PositionMenu;