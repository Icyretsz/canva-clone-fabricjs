import React from 'react';
import {Editor} from "@/features/editor/sidebar/types";

interface PositionProps {
    editor: Editor | undefined;
}

const PositionMenu = (editor : PositionProps) => {
    return (
        <div>
            Position
        </div>
    );
};

export default PositionMenu;