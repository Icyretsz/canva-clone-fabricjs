import React from 'react';
import {Button} from '@/components/ui/button'
import MenuExpandContext from '@/features/editor/contexts/isExpanded'

const Sidebar = () => {

    const {isExpanded, setExpanded} = MenuExpandContext()

    return (
        <div className='h-full'>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex justify-center bg-[#18191a]'>
                <Button className='w-16 text-white' variant="ghost" onClick={setExpanded}>Shapes</Button>
            </div>
            {isExpanded && <div className='left-[72px] absolute w-[350px] top-[68px] h-[calc(100%-68px)] bg-[#252627]'>i</div>}
        </div>
    );
};

export default Sidebar;