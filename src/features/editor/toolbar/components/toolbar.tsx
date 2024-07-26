import useMenuStore from '@/features/editor/stores/store';
import {Editor} from '@/features/editor/sidebar/types'
import ColorPicker from "@/features/editor/toolbar/components/color-picker";
import StrokeWidthPicker from "@/features/editor/toolbar/components/stroke-width-picker";


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


    return (
        <div className='h-[48px] absolute top-[68px] flex items-center gap-1 px-2' style={style}>
        <ColorPicker editor={editor}/>
        <StrokeWidthPicker editor={editor}/>
    </div>

    );
};

export default Toolbar;
