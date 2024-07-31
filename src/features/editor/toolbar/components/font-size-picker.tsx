import {useState} from "react";
import {Editor} from "@/features/editor/sidebar/types";
import {FaCheck} from "react-icons/fa6";
import {fabric} from "fabric";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface FontSizePickerProps {
    editor: Editor | undefined;
}

const FontSizePicker = ({editor}: FontSizePickerProps) => {
    const [isOpened, setOpened] = useState(false);

    const fontSizes = [6, 8, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120];

    const handleClickPicker = (size: number) => {
        editor?.changeFontSize(size);
        setOpened(!isOpened);
    };

    const incrementFontSize = () => {
        if (editor?.selectedObjects.length && editor?.selectedObjects.length > 1) {
            editor?.incrementFontSize('+')
        } else {
            editor?.canvas.getActiveObjects().forEach((object) => {
                if (object.type === 'textbox') {
                    const size = (object as fabric.Textbox).get('fontSize')
                    if (size) {
                        editor?.changeFontSize(size + 1)
                    }
                }
            })
        }
    };

    const decreaseFontSize = () => {
        if (editor?.selectedObjects.length && editor?.selectedObjects.length > 1) {
            editor?.incrementFontSize('-')
        } else {
            editor?.canvas.getActiveObjects().forEach((object) => {
                if (object.type === 'textbox') {
                    const size = (object as fabric.Textbox).get('fontSize')
                    if (size) {
                        editor?.changeFontSize(size - 1)
                    }
                }
            })
        }
    };

    const fontPickerStyle = 'px-4 flex hover:bg-[#f2f3f5] transition-all duration-100 ease-linear h-[40px] w-full items-center';

    return (
        <div className='relative'>
            <div className='flex h-[32px] w-[106px]'>
                <div
                    className='flex flex-1 justify-center items-center cursor-pointer border-y border-l border-gray-400 rounded-l-md
                     hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                    onClick={decreaseFontSize}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                                -
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={10}>
                                <p>Decrement font size</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div
                    className='flex flex-grow justify-center items-center border-x cursor-pointer border-y border-gray-400
                     hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                    onClick={() => setOpened(!isOpened)}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                                {(editor?.fontSize && editor?.fontSize.length > 1) ? '--' : editor?.fontSize[0]}
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={10}>
                                <p>Font size</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div
                    className='flex flex-1 justify-center items-center cursor-pointer border-y border-r border-gray-400 rounded-r-md
                     hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                    onClick={incrementFontSize}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                                +
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={10}>
                                <p>Increment font size</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

            </div>
            {
                isOpened && (
                    <div
                        className='fixed flex flex-col py-1 top-[104px] h-[840px] w-[106px] border rounded-2xl bg-white z-50 shadow-xl'>
                        {fontSizes.map(size => (
                            <div key={size} className={fontPickerStyle} onClick={() => handleClickPicker(size)}>
              <span className='flex w-full items-center justify-between'>
                {size} {editor?.fontSize[0] === size && editor?.fontSize.length === 1 && <FaCheck/>}
              </span>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default FontSizePicker;
