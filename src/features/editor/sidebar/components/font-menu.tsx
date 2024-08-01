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
import {FaCheck} from "react-icons/fa6";
import {textboxFonts} from "@/features/editor/utils";
import {NextFont} from "next/dist/compiled/@next/font";

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

    const fontCheck = (Font: string): boolean => {
        const fontsArray = textboxFonts(editor)
        if (fontsArray.has(Font)) {
            return true
        }
        return false
    }

    interface RenderAccordionItemProps {
        fontFamily: string;
        light: any;
        normal: any;
        bold: any;
        fontCheck: (font: string) => boolean;
        handleClick: (fontFamily: string) => void;
    }


    const RenderAccordionItem = ({
                                     fontFamily,
                                     light,
                                     normal,
                                     bold,
                                     fontCheck,
                                     handleClick
                                 }: RenderAccordionItemProps) => {

        return (
            <>
                <AccordionItem value={fontFamily}>
                    <AccordionTrigger>
                                <span
                                    className={`${normal.className} flex pr-2 w-full items-center justify-between text-black text-[28px]`}>
                                    {fontFamily} {(fontCheck(light.style.fontFamily) ||
                                    fontCheck(normal.style.fontFamily) ||
                                    fontCheck(bold.style.fontFamily)) && <FaCheck/>}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="h-full w-full flex flex-col">
                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(light.style.fontFamily)}
                            >
                                        <span
                                            className={`${light.className} flex pr-2 w-full items-center justify-between pl-4 font-light text-black text-[24px] `}>
                                            Light {fontCheck(light.style.fontFamily) && <FaCheck/>}</span>
                            </div>

                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(normal.style.fontFamily)}
                            >
                                        <span
                                            className={`${normal.className} flex pr-2 w-full items-center justify-between pl-4 font-normal text-black text-[24px] `}>
                                            Normal {fontCheck(normal.style.fontFamily) && <FaCheck/>}</span>
                            </div>

                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(bold.style.fontFamily)}
                            >
                                        <span
                                            className={`${bold.className} flex pr-2 w-full items-center justify-between pl-4 font-bold text-black text-[24px] `}>
                                            Bold {fontCheck(bold.style.fontFamily) && <FaCheck/>}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </>
        )
    }


    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={'Fonts'}/>
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <Accordion type="multiple" className='h-[40px] flex flex-col px-4 w-full'>
                        <RenderAccordionItem fontFamily={'Montserrat'} light={montserratLight} normal={montserratNormal}
                                             bold={montserratBold} fontCheck={fontCheck} handleClick={handleClick}/>
                        <RenderAccordionItem fontFamily={'Roboto'} light={robotoLight} normal={robotoNormal}
                                             bold={robotoBold} fontCheck={fontCheck} handleClick={handleClick}/>
                        <RenderAccordionItem fontFamily={'Bellota'} light={bellotaLight} normal={bellotaNormal}
                                             bold={bellotaBold} fontCheck={fontCheck} handleClick={handleClick}/>
                    </Accordion>

                </div>
            </div>
        </div>
    );
};

export default FontMenu;
