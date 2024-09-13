
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

    const rgbaToHex = (r : number, g : number, b : number, a : number) => {
        const toHex = (c : number) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        const rHex = toHex(r);
        const gHex = toHex(g);
        const bHex = toHex(b);
        const aHex = toHex(Math.round(a * 255));

        return `#${rHex}${gHex}${bHex}${aHex}`;
    };

    const handleChangeComplete = (color: ColorResult) => {
        if (editor && changeColor && color.rgb.r && color.rgb.g && color.rgb.b && color.rgb.a) {
            const hexColor = rgbaToHex(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a);
            changeColor(hexColor);
        }
    };

    return (
        <div className="fixed w-[350px] top-[68px] h-[calc(100%-68px)] bg-white z-50">
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