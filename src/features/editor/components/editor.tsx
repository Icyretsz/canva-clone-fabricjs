'use client'
import React, {useEffect, useRef} from 'react';
import {useEditor} from "@/features/editor/hooks/useEditor";
import {fabric} from "fabric";
import Header from '@/features/editor/components/header'
import Sidebar from '@/features/sidebar/components/sidebar'
import Toolbar from "@/features/editor/components/toolbar";
import Footer from "@/features/editor/components/footer";
import useMenuExpandStore from "@/features/editor/contexts/isExpanded";

const Editor = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null)
    const {init} = useEditor()
    const isExpanded = useMenuExpandStore((state) => state.isExpanded);

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

    const menuExpandedStyle = isExpanded ?
        {width : 'calc(100% - 72px - 350px',
        left : 'calc(72px + 350px'} :
        {width : 'calc(100% - 72px)', left : '72px'}


    return (
        <div className='flex flex-col h-full'>
            <Header/>
            <Sidebar/>
            <Toolbar/>
            <Footer/>
            <div className='absolute h-[calc(100%-68px-48px-40px)] top-[calc(68px+48px)] flex'
                 style = {menuExpandedStyle}
            >
                <div className='h-full w-full flex-1 bg-gray-200' ref={containerRef}>
                    <canvas ref={canvasRef}/>
                </div>
            </div>
        </div>
    );
};

export default Editor;