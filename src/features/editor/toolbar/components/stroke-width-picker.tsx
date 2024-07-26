import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem} from "@nextui-org/dropdown";

import React from 'react';
import {Button} from "@/components/ui/button";
import {Slider} from "@nextui-org/slider";
import { BsBorderWidth } from "react-icons/bs";
import {Editor} from "@/features/editor/sidebar/types";

interface StrokeWidthProps {
    editor: Editor | undefined;
}

const StrokeWidthPicker = ({editor} : StrokeWidthProps) => {



    const handleOnChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            editor?.setStrokeWidth(value[0]); // Assuming you only want the first value if it's an array
        } else {
            editor?.setStrokeWidth(value);
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant='ghost'
                    size='sm'
                    className='outline-none'
                >
                    <BsBorderWidth className='size-7'/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" className='h-16' isReadOnly={true} >
                    <Slider
                        isDisabled = {editor?.selectedObjects.length === 0}
                        label="Stroke width"
                        size='sm'
                        step={1}
                        maxValue={100}
                        minValue={0}
                        defaultValue={editor?.strokeWidth}
                        onChange={handleOnChange}
                        className="max-w-md"
                    />
                </DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default StrokeWidthPicker;