'use client'
import React, {useEffect, useRef} from 'react';
import {useEditor} from "@/features/editor/hooks/useEditor";
import {fabric} from "fabric";
import Header from '@/features/editor/components/header'
import Sidebar from '@/features/editor/sidebar/components/sidebar'
import Toolbar from "@/features/editor/toolbar/components/toolbar";
import Footer from "@/features/editor/components/footer";
import useMenuStore from "@/features/editor/stores/store";

const Editor = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null)
    const {init, editor} = useEditor()
    const isExpanded = useMenuStore((state) => state.isExpanded);


    useEffect(() => {
            const canvas = new fabric.Canvas(canvasRef.current, {
                controlsAboveOverlay: true,
                preserveObjectStacking: true,
            })

            init({ initialCanvas: canvas, initialContainer: containerRef.current! });

            return () => {
                canvas.dispose();
            };

    }, [init]);

    const menuExpandedStyle = isExpanded ?
        {width : 'calc(100% - 72px - 350px',
        left : 'calc(72px + 350px'} :
        {width : 'calc(100% - 72px)', left : '72px'}


    return (
        <div className='flex flex-col h-full'>
            <Header/>
            <Sidebar editor={editor}/>
            <Toolbar editor={editor}/>
            <Footer/>
            <div className='absolute h-[calc(100%-68px-48px-40px)] top-[calc(68px+48px)] flex'
                 style = {menuExpandedStyle}
            >
                <div className='h-full w-full flex-1 bg-gray-200'  ref={containerRef}>
                    <canvas ref={canvasRef}/>
                </div>
            </div>
        </div>
    );
};

export default Editor;