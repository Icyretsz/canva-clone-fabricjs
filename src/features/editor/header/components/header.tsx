'use client'
import React, {useEffect, useRef, useState} from 'react';
import {UserButton} from '@clerk/nextjs'
import {Button} from "@/components/ui/button";
import {Editor} from "@/features/editor/sidebar/types";

interface HeaderProps {
    editor : Editor | undefined
}

const Header = ({ editor } : HeaderProps) => {
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])

    const exportCanvas = () => {
        const state = JSON.stringify(editor?.canvas.toJSON(['selectable', 'hasControls', 'evented', 'hoverCursor', 'name']));
        // Create a Blob from the JSON string
        const blob = new Blob([state], { type: 'application/json' });

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'canvas_state.json'; // The name of the downloaded file

        // Programmatically click the anchor to trigger the download
        a.click();

        // Clean up the URL object after the download
        URL.revokeObjectURL(a.href);
    }

    const openFileBrowser = () => {
        const a = document.getElementById('inputId')
        a?.click()
    }

    return (
        <div
            className=' w-full h-[68px] text-white absolute px-4 flex items-center justify-between text-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
            Canza
            <div className='relative flex gap-2 justify-center items-center'>
                <input id="inputId" type="file" style={{position: 'fixed', top: '-100em'}}/>
                <Button variant='ghost' onClick={() => openFileBrowser()}>Import</Button>
                <Button variant='ghost' onClick={exportCanvas}>Export</Button>
                {rendered && <UserButton/>}</div>
        </div>
    );
};

export default Header;