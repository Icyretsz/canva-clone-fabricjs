import React from 'react';
import { Toggle } from "@/components/ui/toggle"
import {Editor} from "@/features/editor/sidebar/types";
import useObjectStore from "@/features/editor/stores/store";

interface PositionProps {
    editor: Editor | undefined;
}

const BringfrontSendback = (editor : PositionProps) => {

    const { setActiveTool } = useObjectStore()

    const handlePressed = (pressed : boolean) => {
        if (pressed) {
            setActiveTool("Position")
        } else {
            setActiveTool("Select")
        }
    }

    return (
        <div>
            <Toggle onPressedChange={(pressed) => handlePressed}>Position</Toggle>
        </div>
    );
};

export default BringfrontSendback;