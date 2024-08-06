import {useEffect} from 'react';
import {fabric} from 'fabric';

interface UseKeyPressProps {
    canvas: fabric.Canvas | null;
    clipboard: fabric.Object | undefined;
    setClipboard: (clipboard: fabric.Object) => void;
}

const useKeyPress = ({canvas, clipboard, setClipboard}: UseKeyPressProps) => {
    useEffect(() => {
        const handleCtrlC = (event: KeyboardEvent) => {
            if (canvas) {
                const activeObject = canvas.getActiveObject()
                if (activeObject && (event.ctrlKey || event.metaKey) && event.key === 'c') {
                    activeObject.clone((cloned: fabric.Object) => {
                        setClipboard(cloned)
                    });
                }
            }
        };

        const handleCtrlV = (event: KeyboardEvent) => {
            if (canvas) {
                if (clipboard && (event.ctrlKey || event.metaKey) && event.key === 'v') {
                    const activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'textbox' && (activeObject as fabric.Textbox).isEditing) {
                        return; // Exit the function if a textbox is being edited
                    }
                    clipboard.clone(function (cloned: fabric.Object) {
                        canvas.discardActiveObject();
                        cloned.set({
                            left: (cloned.left && cloned.left + 10),
                            top: (cloned.top && cloned.top + 10),
                            evented: true,
                        });
                        if (cloned instanceof fabric.ActiveSelection) {
                            cloned.canvas = canvas;
                            cloned.forEachObject(function(obj) {
                                canvas.add(obj);
                            });
                            cloned.setCoords();
                        } else {
                            canvas.add(cloned);
                        }
                        clipboard.set({
                            left: (cloned.left && cloned.left + 10),
                            top: (cloned.top && cloned.top + 10),
                        })
                        canvas.setActiveObject(cloned);
                        canvas.requestRenderAll();
                    });
                }
            }
        };

        window.addEventListener('keydown', handleCtrlC);
        window.addEventListener('keydown', handleCtrlV);

        return () => {
            window.removeEventListener('keydown', handleCtrlC);
            window.removeEventListener('keydown', handleCtrlV);
        };
    }, [canvas, clipboard, setClipboard]);
};

export default useKeyPress;
