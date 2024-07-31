import {useState} from "react";
import {Editor} from "@/features/editor/sidebar/types";

interface FontSizePickerProps {
    editor: Editor | undefined;
}

const FontSizePicker = ({editor} : FontSizePickerProps) => {

    const [isOpened, setOpened] = useState(false)

    const items = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        }
    ];

    const handleClickPicker = (size : number) => {
        editor?.changeFontSize(size)
    }

    const incrementFontSize = () => {
        editor?.changeFontSize(editor?.fontSize + 1)
    }

    const decreaseFontSize = () => {
        editor?.changeFontSize(editor?.fontSize - 1)
    }

    const fontPickerStyle = 'px-4 flex hover:bg-[#f2f3f5] transition-all duration-100 ease-linear h-[40px] w-full items-center'

    return (
        <div className='relative'>
            <div className='flex h-[32px] w-[106px]'>
                <div className='flex flex-1 justify-center items-center cursor-pointer border-y border-l border-gray-400 rounded-l-md
                         hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                     onClick={() => decreaseFontSize()}
                >-
                </div>
                <div className='flex flex-grow justify-center items-center border-x cursor-pointer border-y border-gray-400
                         hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                        onClick={() => setOpened(!isOpened)}
                >
                    {editor?.fontSize}
                </div>
                <div className='flex flex-1 justify-center items-center cursor-pointer border-y border-r border-gray-400 rounded-r-md
                         hover:bg-[#f2f3f5] transition-all duration-100 ease-linear'
                onClick={() => incrementFontSize()}
                >+
                </div>
            </div>
            {isOpened && <div
                className='fixed flex flex-col py-1 top-[104px] h-[760px] w-[106px] border rounded-2xl bg-white z-50 shadow-xl'>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(6)}}><span>6</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(8)}}><span>8</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(10)}}><span>10</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(12)}}><span>12</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(14)}}><span>14</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(16)}}><span>16</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(18)}}><span>18</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(21)}}><span>21</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(24)}}><span>24</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(28)}}><span>28</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(32)}}><span>32</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(36)}}><span>36</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(42)}}><span>42</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(48)}}><span>48</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(56)}}><span>56</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(64)}}><span>64</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(72)}}><span>72</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(80)}}><span>80</span></div>
                <div className={fontPickerStyle} onClick={() => {handleClickPicker(88)}}><span>88</span></div>

            </div>}
        </div>
    );
};

export default FontSizePicker;