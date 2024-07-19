import React, {Dispatch, SetStateAction} from 'react';

const Sidebar = ({isExpanded, setExpanded} : {isExpanded : boolean, setExpanded: Dispatch<SetStateAction<boolean>>}) => {

    const expandMenu = () => {
        setExpanded(!isExpanded);
    }

    return (
        <div>
        <div className='absolute w-[72px] h-[calc(100%-68px)]  top-[68px]'>
            <button className='bg-blue-200' onClick={expandMenu}>Shapes</button>
        </div>
            {isExpanded && <div className='bg-black w-[250px] h-full'>i</div>}
        </div>
    );
};

export default Sidebar;