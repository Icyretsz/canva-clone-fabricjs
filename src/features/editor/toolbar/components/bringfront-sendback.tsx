import React from 'react';
import { Button } from "@/components/ui/button"
import {Editor} from "@/features/editor/sidebar/types";
import useObjectStore from "@/features/editor/stores/store";

interface PositionProps {
    editor: Editor | undefined;
}

const BringfrontSendback = (editor : PositionProps) => {

    const { activeTool, setActiveTool } = useObjectStore()

    const handleClick = () => {
        setActiveTool(activeTool[0], 'Position')
    }

    return (
        <div>
            <Button variant='ghost' onClick={handleClick}>Position</Button>
        </div>
    );
};

export default BringfrontSendback;