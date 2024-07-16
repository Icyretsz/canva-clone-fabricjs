'use client'
import React, {useEffect, useRef} from 'react';
import {useEditor} from "@/features/editor/hooks/useEditor";
import {fabric} from "fabric";
import Header from '@/features/editor/components/header'
const Editor = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const {init} = useEditor()

    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true
            }
        )
        init({initialCanvas: canvas, initialContainer: containerRef.current!})

        return () => {
            canvas.dispose();
        };
    }, [init])

    return (
        <div className='flex flex-col h-full'>
            <Header/>
            <div className='absolute h-[calc(100%-68px)] top-[68px] w-full flex'>
                <div className='h-full flex-1 bg-gray-200' ref={containerRef}>
                    <canvas ref={canvasRef}/>
                </div>
            </div>
        </div>
    );
};

export default Editor;