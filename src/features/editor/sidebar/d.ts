// import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
// import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
// import {Button} from "@/components/ui/button";
// import {BsBorderWidth} from "react-icons/bs";
// import {Slider} from "@nextui-org/slider";
// import {Toggle} from "@radix-ui/react-toggle";
// import React from "react";
//
// <TooltipProvider>
//     <Tooltip delayDuration={200}>
// <TooltipTrigger asChild>
// <div>
//     <Dropdown closeOnSelect={false}>
// <DropdownTrigger>
//     <Button
//         variant='ghost'
// size='sm'
// className='outline-none'
// >
// <BsBorderWidth className='size-7'/>
//     </Button>
//     </DropdownTrigger>
//     <DropdownMenu aria-label="Static Actions" >
// <DropdownItem key="new" className='h-16' isReadOnly={true} >
// <Slider
//     isDisabled={editor?.selectedObjects.length === 0}
// label="Stroke width"
// size='sm'
// step={1}
// maxValue={100}
// minValue={0}
// defaultValue={editor?.strokeWidth}
// onChange={handleOnChange}
// className="max-w-md"
//     />
//     </DropdownItem>
//     <div className='flex gap-2'>
// <DropdownItem>
//     <Toggle aria-label="stroke-none">
//
// </Toggle>
// </DropdownItem>
// <DropdownItem>
// <Toggle aria-label="stroke-solid">
//
// fwefewfwef
// </Toggle>
// </DropdownItem>
// <DropdownItem>
// <Toggle aria-label="stroke-dash-1">
//
//
// </Toggle>
// </DropdownItem>
// <DropdownItem>
// <Toggle aria-label="stroke-dash-2">
//
//
//     </Toggle>
//     </DropdownItem>
//     </div>
//     </DropdownMenu>
//     </Dropdown>
//     </div>
//     </TooltipTrigger>
//     <TooltipContent>
//     <p>Stroke width</p>
// </TooltipContent>
// </Tooltip>
// </TooltipProvider>