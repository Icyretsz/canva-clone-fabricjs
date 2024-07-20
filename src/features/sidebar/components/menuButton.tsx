import React from 'react';
import MenuExpandContext from "@/features/editor/contexts/isExpanded";


const MenuButton = () => {

    const {setExpanded} = MenuExpandContext()
    const {activeButton, setActiveButton} = MenuExpandContext()
    const menuButtons = ['Shapes', 'Text', 'Upload']

    const handleButtonClick = (index : string) => {
        setActiveButton(index)
        setExpanded(true)
    }


    return (
        <div>
            {menuButtons.map((button, index) => (
                <button
                    key={index}
                    className={`text-white hover:bg-[#252627] w-full h-12 toggle-button ${activeButton === button ? 'bg-[#252627]' : 'bg-[#18191a]'}`}
                    onClick={() => handleButtonClick(button)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

export default MenuButton;