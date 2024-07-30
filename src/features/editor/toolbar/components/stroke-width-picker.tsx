import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from 'react';
import {Button} from "@/components/ui/button";
import {Slider} from "@nextui-org/slider";
import {BsBorderWidth} from "react-icons/bs";
import {Editor} from "@/features/editor/sidebar/types";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";

import {AiOutlineStop} from "react-icons/ai";
import {GoDash} from "react-icons/go";
import {CgBorderStyleDashed} from "react-icons/cg";
import {AiOutlineSmallDash} from "react-icons/ai";


interface StrokeWidthProps {
    editor: Editor | undefined;
}

type StrokeTypes = "stroke-none" | "stroke-solid" | "stroke-dash" | "stroke-dot";


const StrokeWidthPicker = ({editor}: StrokeWidthProps) => {

    const strokeType = editor?.strokeType
    const changeStrokeType = editor?.changeStrokeType

    const handleOnChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            editor?.changeStrokeWidth(value[0]);
        } else {
            const strokeWidth = value;

            editor?.selectedObjects.forEach((element) => {
                const objLeft = element.get('left') ?? 0;
                const objTop = element.get('top') ?? 0;
                const currentStrokeWidth = element.get('strokeWidth') ?? 0;
                const strokeWidthDifference = strokeWidth - currentStrokeWidth;
                editor?.changeStrokeWidth(strokeWidth);
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

    const handleToggleChange = (value: StrokeTypes) => {
        if (strokeType && changeStrokeType && value === 'stroke-none') {
            editor?.changeStrokeWidth(0)
            changeStrokeType(value)
        } else if (strokeType && changeStrokeType) {
            changeStrokeType(value)
        }
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <div>
                        <Popover placement="bottom" showArrow={true} className='w-[340px] h-[288px] p-4'>
                            <PopoverTrigger>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='outline-none'
                                >
                                    <BsBorderWidth className='size-7'/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="w-[300px] flex flex-col p-4 gap-4 justify-center'">

                                    <div className='flex justify-center'>
                                        <ToggleGroup variant="outline"
                                                     className='flex justify-between gap-4'
                                                     type="single"
                                                     onValueChange={(value: StrokeTypes) => {
                                                         handleToggleChange(value)
                                                     }}
                                        >
                                            <ToggleGroupItem className='h-[40px] w-[56px]' value="stroke-none">
                                                <AiOutlineStop className='h-[40px] w-[56px]'/>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className='h-[40px] w-[56px]' value="stroke-solid">
                                                <GoDash className='h-[40px] w-[56px]'/>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className='h-[40px] w-[56px]' value="stroke-dash">
                                                <CgBorderStyleDashed className='h-[40px] w-[56px]'/>
                                            </ToggleGroupItem>
                                            <ToggleGroupItem className='h-[40px] w-[56px]' value="stroke-dot">
                                                <AiOutlineSmallDash className='h-[40px] w-[56px]'/>
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>

                                    <Slider
                                        isDisabled={editor?.strokeWidth === 0}
                                        label="Stroke width"
                                        size='sm'
                                        step={1}
                                        maxValue={100}
                                        minValue={0}
                                        defaultValue={editor?.strokeWidth}
                                        onChange={handleOnChange}
                                        className="max-w-md"
                                    />

                                    <Slider
                                        isDisabled={strokeType === 'stroke-none'}
                                        label="Border radius"
                                        size='sm'
                                        step={1}
                                        maxValue={100}
                                        minValue={0}
                                        value={editor?.strokeWidth}
                                        className="max-w-md"
                                    />

                                </div>
                            </PopoverContent>
                        </Popover>
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