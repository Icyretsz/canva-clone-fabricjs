import React from 'react';
import useMenuStore from '@/features/editor/sidebar/stores/sidebar-store';
import ShapeToolbar from '@/features/editor/toolbar/components/shape-toolbar'
const Toolbar = () => {
    const isExpanded = useMenuStore((state) => state.isExpanded);

    const style = isExpanded ? {
       width :'calc(100% - 72px - 350px)', left : 'calc(72px + 350px)'} :
        {width : 'calc(100% - 72px)', left : '72px'}
    ;

    return (
        <div className='h-[48px] absolute top-[68px]' style={style}>
            <ShapeToolbar/>
        </div>
    );
};

export default Toolbar;
