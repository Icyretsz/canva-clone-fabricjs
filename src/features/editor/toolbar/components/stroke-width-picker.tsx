import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from 'react';
import {Button} from "@/components/ui/button";
import {Slider} from "@nextui-org/slider";
import {BsBorderWidth} from "react-icons/bs";
import {Editor} from "@/features/editor/sidebar/types";
import {fabric} from "fabric";

interface StrokeWidthProps {
    editor: Editor | undefined;
}

const StrokeWidthPicker = ({editor}: StrokeWidthProps) => {


    const handleOnChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            editor?.setStrokeWidth(value[0]);
        } else {
            const strokeWidth = value;

            editor?.selectedObjects.forEach((element) => {
                const objLeft = element.get('left') ?? 0;
                const objTop = element.get('top') ?? 0;
                const currentStrokeWidth = element.get('strokeWidth') ?? 0;
                const strokeWidthDifference = strokeWidth - currentStrokeWidth;
                editor?.setStrokeWidth(strokeWidth);
                const objNewLeft = objLeft - strokeWidthDifference / 2;
                const objNewTop = objTop - strokeWidthDifference / 2;

                element.set({
                    left: objNewLeft,
                    top: objNewTop,
                })
                element.setCoords();
            })
            editor?.canvas.renderAll()
        }
    };


    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <div>
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
                                <DropdownItem key="new" className='h-16' isReadOnly={true}>
                                    <Slider
                                        isDisabled={editor?.selectedObjects.length === 0}
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
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Stroke width</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default StrokeWidthPicker;