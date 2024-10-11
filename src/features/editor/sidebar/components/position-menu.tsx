'use client'
import React, {useState, useRef, useEffect} from 'react';
import {Editor, positionControlType} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Button} from "@/components/ui/button"
import {TbStackForward} from "react-icons/tb";
import {TbStackFront} from "react-icons/tb";
import {TbStackBackward} from "react-icons/tb";
import {TbStackBack} from "react-icons/tb";
import {RxDragHandleDots1} from "react-icons/rx";
import {createSwapy} from 'swapy'
import LayersDnd from "@/features/editor/sidebar/components/layers-dnd";

interface PositionMenuProps {
    editor: Editor | undefined;
    type: string
}

export interface ObjectDataUrlType {
    slotId: string,
    itemId: string | null
}

const PositionMenu = ({editor, type}: PositionMenuProps) => {
    const [currentTab, setCurrentTab] = useState<string>('Arrange')
    const [objectDataUrl, setObjectDataUrl] = useState<ObjectDataUrlType[]>([])


    const handleOnClick = (type: string) => {
        setCurrentTab(type)
    }

    const TabSwitchingBtn = ({type}: { type: string }) => {
        return (
            <Button variant='ghost' className='w-[50%] relative'
                    onClick={() => handleOnClick(type)}>
                {type}
                {currentTab === type &&
                    <div className='absolute top-[100%] h-[5px] w-[85%] rounded-xl bg-[#3493ec]'></div>}
            </Button>
        )
    }

    interface PositionControlBtnProps {
        icon: React.ReactNode;
        controlType: positionControlType;
    }

    const PositionControlBtn: React.FC<PositionControlBtnProps> = ({icon, controlType}) => {
        return (
            <Button variant="ghost" className="flex justify-center items-center h-[50%] w-[50%]"
                    onClick={() => positionChange(controlType)}>
                {icon}
            </Button>
        );
    };

    const positionChange = (controlType: positionControlType) => {
        editor?.positionControl(controlType)
    }

    function getObjectThumbnails() {
        const objects = editor?.canvas?.getObjects()
        const objectDataUrlArray: ObjectDataUrlType[] = []
        objects?.map((object) => {
            objectDataUrlArray.push({
                    slotId: (objectDataUrlArray.length).toString(),
                    itemId: object.toDataURL({
                        format: 'jpeg',
                        quality: 0.5,
                    })
                }
            )
        })
        setObjectDataUrl(objectDataUrlArray)
    }

    useEffect(() => {
        getObjectThumbnails()
    }, [])

    return (
        <div>
            <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
                <div className="flex flex-col h-full w-full bg-white border-r-[1px] border-gray-200 px-[5px]">
                    <div className=' w-full'>
                        <MenuHeaderLight type={type}/>
                        <div className=" w-full flex justify-center px-[5px] mb-[10px]">
                            <TabSwitchingBtn type='Arrange'/>
                            <TabSwitchingBtn type='Layers'/>
                        </div>
                    </div>
                    {currentTab === 'Arrange' && <div className='h-[10%] w-full flex flex-wrap'>
                        <PositionControlBtn icon={<TbStackForward className='size-8'/>} controlType={'bringForward'}/>
                        <PositionControlBtn icon={<TbStackBackward className='size-8'/>} controlType={'sendBackwards'}/>
                        <PositionControlBtn icon={<TbStackFront className='size-8'/>} controlType={'bringToFront'}/>
                        <PositionControlBtn icon={<TbStackBack className='size-8'/>} controlType={'sendToBack'}/>
                    </div>}
                    <LayersDnd objectDataUrl={objectDataUrl} setObjectDataUrl={setObjectDataUrl} editor={editor}
                               currentTab={currentTab}/>
                </div>
            </div>
        </div>
    );
};

export default PositionMenu;