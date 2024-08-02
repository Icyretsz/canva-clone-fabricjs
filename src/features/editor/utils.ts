import {Editor} from "@/features/editor/sidebar/types";

export function isTextType(type : string | undefined) {
    return type === "text" || type === "i-text" || type === "textbox"
}

export const textboxFonts = (editor: Editor | undefined): Set<{ fontFamily: string; fontWeight: number }> => {
    const selected = editor?.selectedObjects;
    const fontFamilySet = new Set<{ fontFamily: string; fontWeight: number }>();

    if (selected) {
        for (const object of selected) {
            if (object.type === 'textbox') {
                const fontFamily = (object as fabric.Textbox).get('fontFamily');
                const fontWeight = (object as fabric.Textbox).get('fontWeight');
                if (fontFamily && fontWeight) {
                    fontFamilySet.add({ fontFamily, fontWeight });
                }
            }
        }
    }
    return fontFamilySet;
}