'use client'
import React, {useEffect, useRef} from 'react';
import {useEditor} from "@/features/editor/hooks/useEditor";
import {fabric} from "fabric";
import Header from '@/features/editor/header/components/header'
import Sidebar from '@/features/editor/sidebar/components/sidebar'
import Toolbar from "@/features/editor/toolbar/components/toolbar";
import Footer from "@/features/editor/components/footer";
import useObjectStore from "@/features/editor/stores/store";
import UploadMenu from "@/features/editor/sidebar/components/upload-menu";
import PageSelector from "@/features/editor/canvasSelector/components/pageSelector";


const Editor = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null)
    const {init, editor} = useEditor()
    const {isExpanded, activeTool} = useObjectStore()


    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
            fireRightClick: true,
            stopContextMenu: true,
        })

        init({initialCanvas: canvas, initialContainer: containerRef.current!});

        return () => {
            editor?.canvas.getObjects().forEach((object) => {
                object.off()
            })
            canvas.dispose();
        };
    }, [init]);

    const menuExpandedStyle = isExpanded ?
        {
            width: 'calc(100% - 72px - 350px',
            left: 'calc(72px + 350px'
        } :
        {width: 'calc(100% - 72px)', left: '72px'}

    const visibleStyle: React.CSSProperties = {
        opacity: activeTool[1] !== "" || activeTool[0] !== "Upload" ? 0 : 1,
        pointerEvents: activeTool[1] !== "" || activeTool[0] !== "Upload" ? 'none' : 'auto',
    };

    return (
        <div className='flex flex-col h-full'>
            <Header editor={editor}/>
            <Sidebar editor={editor}/>
            <Toolbar editor={editor}/>
            <Footer/>
            <PageSelector editor={editor}/>
            <div className='absolute h-[calc(100%-68px-48px-40px-100px)] top-[calc(68px+48px)] flex'
                 style={menuExpandedStyle}
            >
                <div className='h-full w-full flex-1 bg-gray-200' ref={containerRef}>
                    <canvas ref={canvasRef}/>
                </div>
            </div>
            <div className={`left-[72px] top-[68px] fixed h-[calc(100%-68px)] w-[350px] ${(activeTool[1] == "" && activeTool[0] == "Upload") ? "animate-slideRightAndFade" : ""}`} style={visibleStyle}>
                <UploadMenu editor={editor}/>
            </div>
        </div>
    );
};

export default Editor;