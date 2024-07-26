import useMenuStore from '@/features/editor/stores/store';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {Editor} from '@/features/editor/sidebar/types'
import {useState} from "react";

interface ToolbarProps {
    editor: Editor | undefined;
}

const Toolbar = ({editor}: ToolbarProps) => {
    const isExpanded = useMenuStore((state) => state.isExpanded);
    const {setActiveTool, setExpanded} = useMenuStore()
    const selectedObjects = editor?.canvas.getActiveObjects()

    const getProperty = (property: any) => {
        if (!selectedObjects || selectedObjects.length === 0) return null
        return selectedObjects[0].get(property)
    }

    const fillColor = getProperty('fill')


    const colors = editor?.activeColors


    const style = isExpanded ? {
                width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'
            } :
            {width: 'calc(100% - 72px)', left: '72px'}
    ;

    return (
        <div className='h-[48px] absolute top-[68px] flex items-center px-2' style={style}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {colors?.length === 1 ? <div className='size-10 rounded-full'
                                                     style={{backgroundColor: fillColor}} onClick={() => {
                                setActiveTool('ColorPicker')
                                setExpanded(true)
                            }}
                            ></div> :
                            <div className='flex rounded-full size-10 relative overflow-hidden'
                                 onClick={() => {
                                     setActiveTool('ColorPicker')
                                     setExpanded(true)
                                 }}
                            >
                                {(colors && colors.length > 0) && <div className="flex w-full h-full relative">
                                    {colors.map((color, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="absolute top-0 h-full"
                                                style={{
                                                    backgroundColor: color,
                                                    width: `${100 / colors.length}%`,
                                                    left: `${(100 / colors.length) * index}%`
                                                }}
                                            ></div>
                                        );
                                    })}
                                </div>}
                            </div>
                        }
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Color Picker</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    );
};

export default Toolbar;
