import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import useMenuStore from "@/features/editor/stores/store";

interface FontPickerProps {
    editor: Editor | undefined;
}


const FontPicker = ({editor}: FontPickerProps) => {
    const { setActiveTool, setExpanded } = useMenuStore();

    return (
        <div className='w-[170px] h-[32px] flex justify-center items-center cursor-pointer border
        border-gray-400 rounded-md hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
        onClick={()=>{
            setActiveTool('Font')
            setExpanded(true)
        }}>
            {editor?.fontFamily}
        </div>
    );
};

export default FontPicker;