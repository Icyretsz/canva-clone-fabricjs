
import MenuHeaderLight from "@/features/editor/sidebar/components/menu-header-light";
import {Editor} from "@/features/editor/sidebar/types";
import { ChromePicker, CirclePicker } from 'react-color';
import { ColorResult } from 'react-color';

interface ColorMenuProps {
    editor : Editor | undefined;
    type: 'Fill' | 'Stroke Color';
}

const ColorMenu = ({ editor, type }: ColorMenuProps) => {

    const colors = type === 'Fill' ? editor?.fillColor : editor?.strokeColor
    const changeColor = type === 'Fill' ? editor?.changeFillColor : editor?.changeStrokeColor

    const handleChangeComplete = (color: ColorResult) => {
        if (editor && changeColor) {
            changeColor(color.hex);
        }
    };

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white">
            <div className="h-full w-full bg-white border-r-[1px] border-gray-200">
                <MenuHeaderLight type={type} />
                <div className="h-full w-full flex flex-col items-center gap-5">
                    <ChromePicker color={colors ? colors[0] : undefined} onChange={handleChangeComplete} />
                    <CirclePicker color={colors ? colors[0] : undefined} onChange={handleChangeComplete} />
                </div>
            </div>
        </div>
    );
};


export default ColorMenu;