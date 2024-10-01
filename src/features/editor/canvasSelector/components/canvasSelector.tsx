'use client'
import React, {useEffect, useState} from 'react';
import useObjectStore from '@/features/editor/stores/store';
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";
import { Button } from "@/components/ui/button"
import {useEditor} from "@/features/editor/hooks/useEditor";
import {fabric} from "fabric";

interface CanvasSelectorProps {
    AddNewCanvas: () => React.ReactNode;
}


const CanvasSelector = () => {

    const {isExpanded, canvasContainer, canvasThumbnails, setCanvasThumbnails, originalWorkspaceDimension} = useObjectStore()
    const {getCanvasThumbnail} = useCanvasThumbnail()
    const {init, editor} = useEditor()

    const style = isExpanded ? {width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'} :
        {width: 'calc(100% - 72px)', left: '72px'}
    ;

    useEffect(() => {
        getCanvasThumbnail()
    }, [canvasContainer])

    // const HandleClick = () => {
    //     AddNewCanvas()
    //     useEffect(() => {
    //         const canvas = new fabric.Canvas(canvasRef.current, {
    //             controlsAboveOverlay: true,
    //             preserveObjectStacking: true,
    //             fireRightClick: true,
    //             stopContextMenu: true,
    //         })
    //
    //         init({initialCanvas: canvas, initialContainer: containerRef.current!});
    //
    //         setCanvasContainer([... canvasContainer, canvas]);
    //
    //         return () => {
    //             editor?.canvas.getObjects().forEach((object) => {
    //                 object.off()
    //             })
    //             canvas.dispose();
    //         };
    //     }, [init]);
    // }

    return (
        <div className='h-[100px] w-[calc(100%-64px)] top-[calc(100%-140px)] absolute z-50 bg-gray-200 flex justify-center p-2 gap-5' style={style}>
            {canvasThumbnails.map((url, i) => {
                return <img key={i} src={url} alt='canvas thumbnail' className='rounded-md'/>
            })}
            <Button variant='outline' className='h-full w-[198px] flex justify-center items-center text-5xl' >+</Button>
        </div>
    );
};

export default CanvasSelector;