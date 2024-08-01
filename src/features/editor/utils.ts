import {Editor} from "@/features/editor/sidebar/types";

export function isTextType(type : string | undefined) {
    return type === "text" || type === "i-text" || type === "textbox"
}

export const textboxFonts = (editor : Editor | undefined): Set<string> => {
    const selected = editor?.selectedObjects;
    const fontFamilySet = new Set<string>(); //set won't allow duplicates

    if (selected) {
        for (const object of selected) {
            if (object.type === 'textbox') {
                const fontFamily = (object as fabric.Textbox).get('fontFamily');
                if (fontFamily) {
                    fontFamilySet.add(fontFamily);
                }
            }
        }
    }
    return fontFamilySet;
}