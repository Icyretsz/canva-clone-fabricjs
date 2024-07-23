import React from 'react';
import useMenuStore from '@/features/editor/sidebar/stores/sidebar-store';

const ToolbarShape = () => {
    // const isExpanded = useMenuExpandStore((state) => state.isExpanded);
    //
    // const style = isExpanded ? {
    //         width :'calc(100% - 72px - 350px)', left : 'calc(72px + 350px)'} :
    //     {width : 'calc(100% - 72px)', left : '72px'}
    // ;

    return (
        <div className='h-full w-full bg-black'></div>
        // <div className='h-[48px] absolute top-[68px]' style={style}>
        //     Toolbar
        // </div>
    );
};

export default ToolbarShape;
