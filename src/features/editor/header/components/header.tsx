'use client'
import React, {useEffect, useState} from 'react';
import {UserButton} from '@clerk/nextjs'
import {Button} from "@/components/ui/button";
import {Editor} from "@/features/editor/sidebar/types";
import useCanvasThumbnail from "@/features/editor/canvasSelector/utils";

interface HeaderProps {
    editor : Editor | undefined
}

const Header = ({ editor } : HeaderProps) => {
    const {getCanvasThumbnail} = useCanvasThumbnail({editor})
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])



    const exportCanvas = () => {
        const state = JSON.stringify(editor?.canvas.toJSON(['selectable', 'hasControls', 'evented', 'hoverCursor', 'name'])) + '###' + editor?.pageContainer.length;
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const json = event.target?.result;
                if (json && typeof json === 'string') {
                    const [jsonString, appendedNumber] = json.split('###');
                    editor?.canvas.loadFromJSON(jsonString, () => {
                        editor?.canvas.renderAll()
                        let newPageContainer : number[] = []
                        for (let i = 1; i <= Number(appendedNumber); i++) {
                            newPageContainer = [...newPageContainer, i]
                        }
                        editor?.setPageContainer(newPageContainer)
                        editor?.setCurrentPage(1)
                    });
                }
            };
            reader.readAsText(file)
            editor?.autoZoom()
        }
    };

    useEffect(() => {
        getCanvasThumbnail({page : -1})
    }, [editor?.pageContainer])

    return (
        <div
            className=' w-full h-[68px] text-white absolute px-4 flex items-center justify-between text-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
            Canza
            <div className='relative flex gap-2 justify-center items-center'>
                <input id="inputId" type="file" style={{position: 'fixed', top: '-100em'}} onChange={(e) => handleFileChange(e)}/>
                <Button variant='ghost' onClick={() => openFileBrowser()}>Import</Button>
                <Button variant='ghost' onClick={exportCanvas}>Export</Button>
                {rendered && <UserButton/>}</div>
        </div>
    );
};

export default Header;