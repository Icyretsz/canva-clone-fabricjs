import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Inter, Montserrat, Roboto} from "next/font/google";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FontMenuProps {
    editor: Editor | undefined;
}

const montserrat = Montserrat({subsets: ["latin"]});
const roboto = Roboto({
    subsets: ['latin', 'vietnamese'],
    weight: ['100', '300', '400', '500', '700', '900'],
});

const FontMenu = ({editor}: FontMenuProps) => {

    const handleClick = () => {
        editor?.changeFontFamily('roboto')
    }

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={'Fonts'}/>
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <Accordion type="multiple" className='h-[40px] flex flex-col px-4 w-full'>
                        <AccordionItem value="montserrat">
                            <AccordionTrigger>
                                <span className={`${montserrat.className} text-black text-[28px]`}>Montserrat</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="h-full w-full flex flex-col">
                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick()}
                                    >
                                        <span
                                            className={`${montserrat.className} pl-4 font-light text-black text-[24px] `}>Light</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'>
                                        <span
                                            className={`${montserrat.className} pl-4 font-normal text-black text-[24px] `}>Normal</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'>
                                        <span
                                            className={`${montserrat.className} pl-4 font-bold text-black text-[24px] `}>Bold</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="roboto">
                            <AccordionTrigger>
                                <span className={`${roboto.className} text-black text-[28px]`}>Roboto</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="h-full w-full flex flex-col">
                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'>
                                        <span
                                            className={`${roboto.className} pl-4 font-light text-black text-[24px] `}>Light</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'>
                                        <span
                                            className={`${roboto.className} pl-4 font-normal text-black text-[24px] `}>Normal</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'>
                                        <span
                                            className={`${roboto.className} pl-4 font-bold text-black text-[24px] `}>Bold</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default FontMenu;