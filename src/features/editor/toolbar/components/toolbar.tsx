import useMenuStore from '@/features/editor/stores/store';
import {Editor} from '@/features/editor/sidebar/types'
import StrokeWidthPicker from "@/features/editor/toolbar/components/stroke-width-picker";
import ColorPicker from "@/features/editor/toolbar/components/color-picker";
import FontSizePicker from "@/features/editor/toolbar/components/font-size-picker";
import AlignmentPicker from "@/features/editor/toolbar/components/alignment-picker";
import FontPicker from "@/features/editor/toolbar/components/font-picker";


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

    const isContainsTextbox = () : boolean => {
        const selected = editor?.selectedObjects
        if (selected) {
            for (let i = 0; i < selected.length; i++) {
                const object = selected[i];
                if (object.type==='textbox') {
                    return true
                }
            }
        }
        return false
    }


    return (

        <div className='h-[48px] absolute top-[68px] flex items-center gap-2 px-2' style={style}>
            {editor?.selectedObjects && editor?.selectedObjects.length > 0 &&
                <>
                    {isContainsTextbox() && <FontPicker editor={editor}/>}
                    {isContainsTextbox() && <FontSizePicker editor={editor}/>}
                    <ColorPicker editor={editor} type='fill'/>
                    {editor?.strokeWidth > 0 && <ColorPicker editor={editor} type='stroke'/>}
                    <StrokeWidthPicker editor={editor}/>
                    {isContainsTextbox() && <AlignmentPicker editor={editor}/>}
                </>
            }
        </div>

    );
};

export default Toolbar;
