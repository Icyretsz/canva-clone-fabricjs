import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Inter, Montserrat, Roboto} from "next/font/google";

interface FontMenuProps {
    editor : Editor | undefined;
}

const montserrat = Inter({ subsets: ["latin"] });
const roboto = Inter({ subsets: ["latin"] });

const FontMenu = ({editor} : FontMenuProps) => {

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={'Fonts'}/>
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <div className='h-[40px] flex flex-col px-4 w-full hover:bg-[#f2f3f5] transition-all duration-100 ease-linear' >
                        <span className={`${montserrat.className} text-black text-[28px]`}>Montserrat</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FontMenu;