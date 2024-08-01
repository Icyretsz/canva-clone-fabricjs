import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Montserrat, Gluten, Bitter} from "next/font/google";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FaCheck} from "react-icons/fa6";
import {textboxFonts} from "@/features/editor/utils";

interface FontMenuProps {
    editor: Editor | undefined;
}

const montserrat = Montserrat({
    subsets: ['latin', 'vietnamese'],
});
const gluten = Gluten({
    subsets: ['latin', 'vietnamese'],
});

const bitter = Bitter({
    subsets: ['latin', 'vietnamese'],
})


const FontMenu = ({editor}: FontMenuProps) => {

    const handleClick = (fontFamily: string, weight: number) => {
        editor?.changeFontFamily(fontFamily);
        editor?.changeFontWeight(weight)
    }

    interface RenderAccordionItemProps {
        fontFamily: any;
        fontName: string;
        fontCheck: (font: string) => boolean;
    }

    const fontCheck = (Font: string): boolean => {
        const fontsArray = textboxFonts(editor)
        if (fontsArray.has(Font)) {
            return true
        }
        return false
    }

    const RenderAccordionItem = ({
                                     fontFamily,
                                     fontName,
                                     fontCheck
                                 }: RenderAccordionItemProps) => {

        return (
            <>
                <AccordionItem value={fontFamily}>
                    <AccordionTrigger>
                                <span
                                    className={`${fontFamily.className} font-regular flex pr-2 w-full items-center justify-between text-black text-[28px]`}>
                                    {fontName} {(fontCheck(fontFamily.style.fontFamily) && (editor?.fontWeight === 300 || editor?.fontWeight === 400 || editor?.fontWeight === 700)) &&
                                    <FaCheck/>}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="h-full w-full flex flex-col">
                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(fontFamily.style.fontFamily, 300)}
                            >
                                        <span
                                            className={`${fontFamily.className} font-light flex pr-2 w-full items-center justify-between pl-4 text-black text-[24px] `}>
                                            Light {fontCheck(fontFamily.style.fontFamily) && editor?.fontWeight === 300 && <FaCheck/>}</span>
                            </div>

                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(fontFamily.style.fontFamily, 400)}
                            >
                                        <span
                                            className={`${fontFamily.className} flex pr-2 w-full items-center justify-between pl-4 font-normal text-black text-[24px] `}>
                                            Normal {fontCheck(fontFamily.style.fontFamily) && editor?.fontWeight === 400 && <FaCheck/>}</span>
                            </div>

                            <div
                                className='hover:bg-[#f2f3f5] transition-all duration-100 ease-linear w-full h-[40px] flex items-center'
                                onClick={() => handleClick(fontFamily.style.fontFamily, 700)}
                            >
                                        <span
                                            className={`${fontFamily.className} flex pr-2 w-full items-center justify-between pl-4 font-bold text-black text-[24px] `}>
                                            Bold {fontCheck(fontFamily.style.fontFamily) && editor?.fontWeight === 700 && <FaCheck/>}</span>
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
                        <RenderAccordionItem fontFamily={montserrat} fontName={'Montserrat'} fontCheck={fontCheck}/>
                        <RenderAccordionItem fontFamily={gluten} fontName={'Gluten'} fontCheck={fontCheck}/>
                        <RenderAccordionItem fontFamily={bitter} fontName={'Bitter'} fontCheck={fontCheck}/>
                    </Accordion>

                </div>
            </div>
        </div>
    );
};

export default FontMenu;
