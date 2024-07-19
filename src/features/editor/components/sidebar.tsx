import React, {Dispatch, SetStateAction} from 'react';
import {Button} from '@/components/ui/button'

const Sidebar = ({isExpanded, setExpanded}: {
    isExpanded: boolean,
    setExpanded: Dispatch<SetStateAction<boolean>>
}) => {

    const expandMenu = () => {
        setExpanded(!isExpanded);
    }

    return (
        <>
            <div className='absolute w-[72px] h-[calc(100%-68px)] top-[68px] flex justify-center border-r-2'>
                <Button className='w-16' variant="outline" onClick={expandMenu}>Shapes</Button>
            </div>
            {isExpanded && <div className='bg-black w-[250px] h-full'>i</div>}
        </>
    );
};

export default Sidebar;