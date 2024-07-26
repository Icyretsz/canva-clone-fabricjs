import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";

import React from 'react';
import {Button} from "@/components/ui/button";
import {Slider} from "@nextui-org/slider";
import { BsBorderWidth } from "react-icons/bs";

const StrokeWidthPicker = () => {
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
                        label="Stroke width"
                        size='sm'
                        step={1}
                        maxValue={100}
                        minValue={0}
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