import useMenuStore from '@/features/editor/stores/store';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Editor} from '@/features/editor/sidebar/types'
import ColorPicker from "@/features/editor/toolbar/components/color-picker";
import {DropdownMenuCheckboxes} from "@/features/editor/toolbar/components/stroke-width-picker";

interface ToolbarProps {
    editor: Editor | undefined;
}

const Toolbar = ({editor}: ToolbarProps) => {
    const isExpanded = useMenuStore((state) => state.isExpanded);





    const style = isExpanded ? {
                width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'
            } :
            {width: 'calc(100% - 72px)', left: '72px'}
    ;

    const objectSelected = editor?.canvas.isEmpty()


    return (
        <div className='h-[48px] absolute top-[68px] flex items-center px-2' style={style}>
        <ColorPicker editor={editor}/>
        <DropdownMenuCheckboxes/>
    </div>

    );
};

export default Toolbar;
