import React from 'react';
import useMenuExpandStore from '@/features/editor/contexts/isExpanded';

const Toolbar = () => {
    const isExpanded = useMenuExpandStore((state) => state.isExpanded);

    const style = isExpanded ? {
       width :'calc(100% - 72px - 350px)', left : 'calc(72px + 350px)'} :
        {width : 'calc(100% - 72px)', left : '72px'}
    ;

    return (
        <div className='h-[48px] absolute top-[68px]' style={style}>
            Toolbar
        </div>
    );
};

export default Toolbar;
