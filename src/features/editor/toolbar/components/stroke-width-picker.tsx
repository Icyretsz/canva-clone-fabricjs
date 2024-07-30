import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Slider} from "@nextui-org/slider";
import {BsBorderWidth} from "react-icons/bs";
import {Editor} from "@/features/editor/sidebar/types";
import {Toggle} from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";

import {AiOutlineStop} from "react-icons/ai";
import {GoDash} from "react-icons/go";
import {CgBorderStyleDashed} from "react-icons/cg";
import {AiOutlineSmallDash} from "react-icons/ai";


interface StrokeWidthProps {
    editor: Editor | undefined;
}

type StrokeToggleType = "stroke-none" | "stroke-solid" | "stroke-dash-1" | "stroke-dash-2";


const StrokeWidthPicker = ({editor}: StrokeWidthProps) => {

    const [strokeToggle, setStrokeToggle] = useState<StrokeToggleType>("stroke-none")


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

    const handleToggleChange = (type: StrokeToggleType) => {
        setStrokeToggle(type)
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

                                    <div className='flex gap-2 justify-between'>
                                        <Toggle variant="outline" aria-label="stroke-none"
                                                className='w-[56px] h-[40px]'

                                                onPressedChange={() => {
                                                    handleToggleChange("stroke-none");
                                                }}
                                                pressed={strokeToggle === "stroke-none"}
                                        >
                                            <AiOutlineStop className='w-[56px] h-[40px]'/>
                                        </Toggle>
                                        <Toggle variant="outline" aria-label="stroke-solid"
                                                className='w-[56px] h-[40px]'

                                                onPressedChange={() => {
                                                    handleToggleChange("stroke-solid");
                                                }}
                                                pressed={strokeToggle === "stroke-solid"}>
                                            <GoDash className='w-[56px] h-[40px]'/>
                                        </Toggle>
                                        <Toggle variant="outline" aria-label="stroke-dash-1"
                                                className='w-[56px] h-[40px]'

                                                onPressedChange={() => {
                                                    handleToggleChange("stroke-dash-1");
                                                }}
                                                pressed={strokeToggle === "stroke-dash-1"}>
                                            <CgBorderStyleDashed className='w-[56px] h-[40px]'/>
                                        </Toggle>
                                        <Toggle variant="outline" aria-label="stroke-dash-2"
                                                className='w-[56px] h-[40px]'

                                                onPressedChange={() => {
                                                    handleToggleChange("stroke-dash-2");
                                                }}
                                                pressed={strokeToggle === "stroke-dash-2"}>
                                            <AiOutlineSmallDash className='w-[56px] h-[40px]'/>
                                        </Toggle>
                                    </div>

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

                                    <Slider
                                        isDisabled={editor?.selectedObjects.length === 0}
                                        label="Border radius"
                                        size='sm'
                                        step={1}
                                        maxValue={100}
                                        minValue={0}
                                        defaultValue={editor?.strokeWidth}
                                        onChange={handleOnChange}
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