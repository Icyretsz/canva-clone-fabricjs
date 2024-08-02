import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import { RiDeleteBinFill } from "react-icons/ri";
import {Editor} from "@/features/editor/sidebar/types";

interface DeleteObjectsProps {
    editor: Editor | undefined;
}

const DeleteObjects = ({editor} : DeleteObjectsProps) => {

    const handleOnClick = () => {
        if (editor) {
            editor.deleteObject()
        }
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button onClick={handleOnClick}
                            variant='ghost'
                            size='sm'
                            className='flex justify-center items-center'
                    >
                        <RiDeleteBinFill className='w-[20px] h-[17px]'/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default DeleteObjects;