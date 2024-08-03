import React from 'react';
import useObjectStore from '@/features/editor/stores/store';

const Footer = () => {

    const isExpanded = useObjectStore((state) => state.isExpanded);

    const style = isExpanded ? {width :'calc(100% - 72px - 350px)', left : 'calc(72px + 350px)'} :
        {width : 'calc(100% - 72px)', left : '72px'}
    ;

    return (
        <div className='h-[40px] top-[calc(100%-40px)] absolute' style={style}>
            Footer
        </div>
    );
};

export default Footer;