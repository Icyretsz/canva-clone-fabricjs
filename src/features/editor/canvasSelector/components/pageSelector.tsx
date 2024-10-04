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

    const {isExpanded, canvasThumbnails} = useObjectStore()
    const {getCanvasThumbnail} = useCanvasThumbnail()
    const scrollToDiv = useRef<HTMLDivElement>(null)

    const style = isExpanded ? {width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'} :
        {width: 'calc(100% - 72px)', left: '72px'}
    ;

    useEffect(() => {
        const canvas = editor?.canvas
        const pageContainer = editor?.pageContainer
        if (canvas && pageContainer) {
            getCanvasThumbnail({canvas, pageContainer})
        }
    }, [editor?.pageContainer, editor?.canvas])

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
                        hasControls: true,
                        evented: true,
                    })
                }
                if (object.name !== editor?.currentPage.toString()) {
                    object.set({
                        opacity: 0,
                        selectable: false,
                        hasControls: false,
                        evented: false,
                    })
                }
            }
        )
        editor?.canvas.renderAll()
    }, [editor?.canvas, editor?.currentPage])

    const addPage = () => {
        editor?.setPageContainer(prev => [...prev, editor?.pageContainer.length + 1])
    }

    useEffect(() => {
        editor?.setCurrentPage(editor?.pageContainer.length)
        if (scrollToDiv.current) {
            scrollToDiv.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [editor?.pageContainer])

    return (
        <div
            className='h-[130px] top-[calc(100%-170px)] items-center absolute z-50 bg-gray-200 flex p-2 gap-5 overflow-x-scroll'
            style={style}>
            {editor?.pageContainer?.map((pageNum) => {
                const url = canvasThumbnails[pageNum - 1]
                return <TooltipProvider key={pageNum}>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger className={`h-[80%] min-w-[140px] flex justify-center items-center`}>
                            <Button variant='outline'
                                    className={`h-full min-w-[100%] ${editor?.currentPage === pageNum && 'border-2 border-[#3b82f6]'} p-0`}
                                    onClick={() => handleChangePage(pageNum)}>
                                <img src={url} alt='canvas thumbnail'
                                     className='rounded-md h-full min-w-[100%]'
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={10}>
                            <p>Page {pageNum}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            })}
            <Button variant='outline'
                    className='h-[80%] min-w-[140px] shrink-0 grow-0 flex justify-center items-center text-5xl'
                    onClick={addPage}>+</Button>
            <div ref={scrollToDiv}></div>
        </div>
    );
};

export default PageSelector;


