import useMenuStore from '@/features/editor/stores/store';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {Editor} from '@/features/editor/sidebar/types'

interface ToolbarProps {
    editor: Editor | undefined;
}

const Toolbar = ({editor}: ToolbarProps) => {
    const isExpanded = useMenuStore((state) => state.isExpanded);
    const {setActiveTool, setExpanded} = useMenuStore()

    const fillColors = editor?.fillColor


    const style = isExpanded ? {
                width: 'calc(100% - 72px - 350px)', left: 'calc(72px + 350px)'
            } :
            {width: 'calc(100% - 72px)', left: '72px'}
    ;


    return (
        <div className='h-[48px] absolute top-[68px] flex items-center px-2' style={style}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {fillColors?.length === 1 ? <div className='size-10 rounded-full'
                                                     style={{backgroundColor: fillColors[0]}} onClick={() => {
                                setActiveTool('ColorPicker')
                                setExpanded(true)
                            }}
                            ></div> :
                            <div className='flex rounded-full size-10 relative overflow-hidden'
                                 onClick={() => {
                                     setActiveTool('ColorPicker')
                                     setExpanded(true)
                                 }}
                            >
                                {(fillColors && fillColors.length > 0) && <div className="flex w-full h-full relative">
                                    {fillColors.map((color, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="absolute top-0 h-full"
                                                style={{
                                                    backgroundColor: color,
                                                    width: `${100 / fillColors.length}%`,
                                                    left: `${(100 / fillColors.length) * index}%`
                                                }}
                                            ></div>
                                        );
                                    })}
                                </div>}
                            </div>
                        }
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Color Picker</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    );
};

export default Toolbar;
