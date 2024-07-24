import React, {useEffect, useState} from 'react';
import useMenuStore from '@/features/editor/stores/store';
import {fabric} from "fabric";
import {Editor} from '@/features/editor/sidebar/types'

interface ToolbarProps {
    editor : Editor | undefined;
}

const Toolbar = ({editor} : ToolbarProps) => {
    const isExpanded = useMenuStore((state) => state.isExpanded);
    const {setActiveTool, setExpanded} = useMenuStore()

    const selectedObjects = editor?.canvas.getActiveObjects()

    const getProperty = (property:any) => {
        if (!selectedObjects || selectedObjects.length === 0) return null
        return selectedObjects[0].get(property)
    }

    const fillColor = getProperty('fill')

    const [properties, setProperties] = useState({fillColor})

    const style = isExpanded ? {
                width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'
            } :
            {width: 'calc(100% - 72px)', left: '72px'}
    ;


    return (
        <div className='h-[48px] absolute top-[68px] flex items-center px-2' style={style}>
            <div className='size-10 rounded-full'
            style = {{backgroundColor:fillColor}} onClick={() => {
                setActiveTool('ColorPicker')
                setExpanded(true)
                console.log('clicked')
            }}
            ></div>
        </div>
    );
};

export default Toolbar;
