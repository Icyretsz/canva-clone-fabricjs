
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Editor} from "@/features/editor/sidebar/types";
import { ChromePicker, CirclePicker } from 'react-color';
import { ColorResult } from 'react-color';

interface ColorMenuProps {
    editor : Editor | undefined;
}

const ColorMenu = ({ editor }: ColorMenuProps) => {

    const handleChangeComplete = (color: ColorResult) => {
        if (editor && editor.changeFillColor) {
            editor.changeFillColor(color.hex);
        }
    };

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type="Color" />
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <ChromePicker color={editor?.fillColor[0]} onChange={handleChangeComplete} />
                    <CirclePicker color={editor?.fillColor[0]} onChange={handleChangeComplete} />
                </div>
            </div>
        </div>
    );
};


export default ColorMenu;