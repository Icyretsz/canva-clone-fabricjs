import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";

interface FontMenuProps {
    editor : Editor | undefined;
}

const FontMenu = ({editor} : FontMenuProps) => {

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={'Fonts'}/>
                <div className="h-full w-full flex flex-col items-center gap-5">

                </div>
            </div>
        </div>
    );
};

export default FontMenu;