'use client'
import React, { useEffect, useRef} from 'react';
import useObjectStore from '@/features/editor/stores/store';
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";
import {Button} from "@/components/ui/button"
import {Editor} from "@/features/editor/sidebar/types";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface PageSelectorProps {
    editor: Editor | undefined;
}

const PageSelector = ({editor}: PageSelectorProps) => {

    const {isExpanded, canvasContainer} = useObjectStore()
    const {getCanvasThumbnail} = useCanvasThumbnail()
    const thumbnailContainer = useRef<HTMLDivElement>(null)

    const style = isExpanded ? {width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'} :
        {width: 'calc(100% - 72px)', left: '72px'}
    ;

    useEffect(() => {
        getCanvasThumbnail()
    }, [canvasContainer])

    const handleChangePage = (pageNo: number) => {
        editor?.setCurrentPage(pageNo)
    }

    useEffect(() => {
        editor?.canvas.discardActiveObject()
        const allObjects = editor?.canvas.getObjects()
        allObjects?.forEach((object) => {
                if (object.name === 'clip') return
                if (object.name === editor?.currentPage.toString()) {
                    object.set({
                        opacity: 1,
                        selectable: true,
                    })
                    console.log('opacity 1')
                }
                if (object.name !== editor?.currentPage.toString()) {
                    object.set({
                        opacity: 0,
                        selectable: false,
                    })
                    console.log('opacity 0')
                }
            }
        )
        editor?.canvas.renderAll()
    }, [editor?.canvas, editor?.currentPage])

    const addPage = () => {
        editor?.setPageContainer(prev => [...prev, editor?.pageContainer.length])
        editor?.setCurrentPage(editor?.pageContainer.length)
        if (thumbnailContainer.current) {
            const maxScrollLeft =
                thumbnailContainer.current.scrollWidth - thumbnailContainer.current.clientWidth;
            thumbnailContainer.current.scrollLeft += maxScrollLeft;
        }
    }

    return (
        <div
            className='h-[130px] top-[calc(100%-170px)] items-center absolute z-50 bg-gray-200 flex p-2 gap-5 overflow-x-scroll'
            style={style} ref={thumbnailContainer}>
            {editor?.pageContainer?.map((i) => {
                return <TooltipProvider key={i}>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger className={`h-[80%] min-w-[140px] flex justify-center items-center`}>
                            <Button variant='outline'
                                    className={`h-full min-w-[100%] ${editor?.currentPage === i && 'border border-black'}`}
                                    onClick={() => handleChangePage(i)}>
                                {/*<img src={url} alt='canvas thumbnail'*/}
                                {/*     className='rounded-md h-full w-full'*/}
                                {/*/>*/}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={10}>
                            <p>Page {i + 1}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            })}
            <Button variant='outline'
                    className='h-[80%] min-w-[140px] shrink-0 grow-0 flex justify-center items-center text-5xl'
                    onClick={addPage}>+</Button>
        </div>
    );
};

export default PageSelector;

