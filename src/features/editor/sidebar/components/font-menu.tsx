import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Montserrat, Roboto, Bellota} from "next/font/google";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FontMenuProps {
    editor: Editor | undefined;
}

const montserratLight = Montserrat({
    subsets: ['latin', 'vietnamese'],
    weight: '300'
});
const montserratNormal = Montserrat({
    subsets: ['latin', 'vietnamese'],
    weight: '400'
});
const montserratBold = Montserrat({
    subsets: ['latin', 'vietnamese'],
    weight: '700'
});
const robotoLight = Roboto({
    subsets: ['latin', 'vietnamese'],
    weight: '300',
});
const robotoNormal = Roboto({
    subsets: ['latin', 'vietnamese'],
    weight: '400',
});
const robotoBold = Roboto({
    subsets: ['latin', 'vietnamese'],
    weight: '700',
});
const bellotaLight = Bellota({
    subsets: ['latin', 'vietnamese'],
    weight: '300'
})
const bellotaNormal = Bellota({
    subsets: ['latin', 'vietnamese'],
    weight: '400'
})
const bellotaBold = Bellota({
    subsets: ['latin', 'vietnamese'],
    weight: '700'
})

const FontMenu = ({editor}: FontMenuProps) => {

    const handleClick = (fontFamily: string) => {
        editor?.changeFontFamily(fontFamily);
    }

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={'Fonts'}/>
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <Accordion type="multiple" className='h-[40px] flex flex-col px-4 w-full'>
                        <AccordionItem value="montserrat">
                            <AccordionTrigger>
                                <span
                                    className={`${montserratNormal.className} text-black text-[28px]`}>Montserrat</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="h-full w-full flex flex-col">
                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(montserratLight.style.fontFamily)}
                                    >
                                        <span
                                            className={`${montserratLight.className} pl-4 font-light text-black text-[24px] `}>Light</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(montserratNormal.style.fontFamily)}
                                    >
                                        <span
                                            className={`${montserratNormal.className} pl-4 font-normal text-black text-[24px] `}>Normal</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(montserratBold.style.fontFamily)}
                                    >
                                        <span
                                            className={`${montserratBold.className} pl-4 font-bold text-black text-[24px] `}>Bold</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="roboto">
                            <AccordionTrigger>
                                <span className={`${robotoNormal.className} text-black text-[28px]`}>Roboto</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="h-full w-full flex flex-col">
                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(robotoLight.style.fontFamily)}
                                    >
                                        <span
                                            className={`${robotoLight.className} pl-4 font-light text-black text-[24px] `}>Light</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(robotoNormal.style.fontFamily)}
                                    >
                                        <span
                                            className={`${robotoNormal.className} pl-4 font-normal text-black text-[24px] `}>Normal</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(robotoBold.style.fontFamily)}
                                    >
                                        <span
                                            className={`${robotoBold.className} pl-4 font-bold text-black text-[24px] `}>Bold</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="roboto">
                            <AccordionTrigger>
                                <span className={`${bellotaNormal.className} text-black text-[28px]`}>Bellota</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="h-full w-full flex flex-col">
                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(bellotaLight.style.fontFamily)}
                                    >
                                        <span
                                            className={`${bellotaLight.className} pl-4 font-light text-black text-[24px] `}>Light</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(bellotaNormal.style.fontFamily)}
                                    >
                                        <span
                                            className={`${bellotaNormal.className} pl-4 font-normal text-black text-[24px] `}>Normal</span>
                                    </div>

                                    <div
                                        className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                        onClick={() => handleClick(bellotaBold.style.fontFamily)}
                                    >
                                        <span
                                            className={`${bellotaBold.className} pl-4 font-bold text-black text-[24px] `}>Bold</span>
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
